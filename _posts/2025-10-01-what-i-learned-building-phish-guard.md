---
title: "What I Learned Building Phish-Guard"
date: 2025-10-01 10:00:00 +0300
categories: [Cybersecurity, Development]
tags: [phishing, web-security, browser-extension, learning]
---

So I tried building Phish-Guard thinking "how hard could detecting phishing be?" and uh... yeah, I learned a lot. Mostly about how little I knew going in.

## SSL Certificates Are More Complicated Than I Thought

Okay, so everyone's seen that lock icon in the browser, right? I always assumed it meant "this site is safe" but it turns out I was way off.

That lock literally just means:
1. The connection is encrypted (HTTPS)
2. The SSL certificate is valid

That's it. Nothing about whether the site is trustworthy, how old the domain is, or if it's trying to steal your password. I was honestly surprised how little that lock actually tells you.

### Here's What Got Me

Modern phishers aren't using sketchy HTTP sites anymore. They're doing this:
1. Register a fresh domain like "paypa1-security-verify.com" (notice the sneaky "1")
2. Get a free Let's Encrypt certificate in like 2 minutes (totally legit service btw)
3. Clone a bank's login page
4. Boom - browser shows "Secure 🔒"

So now you've got a phishing site that looks secure. The certificate is real, the HTTPS works perfectly, and most people trust that green lock.

### How I'm Checking Certificate Age

This took some digging to figure out. I'm using Certificate Transparency (CT) logs - basically a public record of all SSL certificates issued.

Here's how it works:
1. When someone visits a site, I grab the domain
2. Query crt.sh (a CT log search tool) with: `https://crt.sh/?q=example.com&output=json`
3. Parse the JSON response to get certificate issue dates
4. Compare cert age to domain registration date

The code looks roughly like this:
```javascript
const response = await fetch(`https://crt.sh/?q=${domain}&output=json`);
const certs = await response.json();
const latestCert = certs[0]; // Most recent
const certAge = Date.now() - new Date(latestCert.not_before);
```

If the domain is 3 hours old and the cert is also 3 hours old? Huge red flag. Legitimate sites usually have domains that are years old, even if they renew their certs regularly.

**Edge cases I ran into:**
- CT logs can timeout (set 15s limit)
- Some domains have hundreds of certs (DDoS protection, CDNs, etc.)
- Wildcard certs mess up the age detection
- Not all CAs report to CT logs immediately

## Homograph Attacks Blew My Mind

So I knew about typosquatting - like registering "mircosoft.com" hoping someone mistypes. But homograph attacks? That's some next-level sneaky stuff I didn't even know existed.

Check this out: `paypal.com` vs `pаypal.com`

One of those 'a' letters is Cyrillic (U+0430), the other is Latin (U+0061). They look **identical** but they're completely different characters. So someone can register the Cyrillic version as a totally different domain.

### How This Actually Works

When you type a domain with Unicode characters, browsers convert it to Punycode - an ASCII representation. Here's the thing:
- `paypal.com` → `paypal.com` (no change)
- `pаypal.com` (Cyrillic 'a') → `xn--pypal-4ve.com` (Punycode)

Most browsers now show the Punycode in the address bar if there's mixed scripts (good!), but not all do, and not consistently.

### My Detection Approach

I'm checking for a few things:

**1. Mixed Script Detection:**
```javascript
function hasMixedScripts(domain) {
  const scripts = new Set();
  for (const char of domain) {
    const code = char.codePointAt(0);
    if (code >= 0x0400 && code <= 0x04FF) scripts.add('cyrillic');
    if (code >= 0x0041 && code <= 0x007A) scripts.add('latin');
    // ... check for Greek, Arabic, etc.
  }
  return scripts.size > 1;
}
```

**2. Lookalike Character Database:**
I built a map of visually similar characters:
```javascript
const lookalikes = {
  'а': 'a', // Cyrillic → Latin
  'е': 'e',
  'о': 'o',
  'р': 'p',
  'с': 'c',
  'у': 'y',
  // ... hundreds more
};
```

**3. Brand Name Checking:**
Compare the "normalized" domain (all lookalikes replaced) against known brands:
```javascript
const normalized = domain.split('').map(c => lookalikes[c] || c).join('');
if (knownBrands.includes(normalized) && domain !== normalized) {
  // Potential homograph attack!
}
```

**Things that made this hard:**
- Unicode has like 143,000+ characters
- Some lookalikes are super obscure (Greek 'ο' vs Latin 'o')
- New attack vectors keep being discovered
- False positives on legitimate international domains

I'm still learning about this - it's way deeper than I initially thought.

## iFrames and External Resources Were a Reality Check

So I thought monitoring external resources would be straightforward - just flag anything suspicious, right? Nope.

Turns out, modern websites load resources from **everywhere**. I tested on a random news site and it pulled content from like 30+ different domains. Ad networks, analytics, CDNs, social media widgets, you name it.

### How I Monitor This Stuff

I'm using a MutationObserver to watch for any new resources added to the page:

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === 'SCRIPT') {
        checkExternalScript(node.src);
      } else if (node.tagName === 'IFRAME') {
        checkIframe(node.src);
      }
      // ... also check link, img, etc.
    });
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
```

This catches resources loaded dynamically via JavaScript, which is super common now.

### What I'm Actually Checking

**High-risk patterns:**
- **IP addresses as domains:** `http://192.168.1.1/script.js` → instant red flag
- **Sketchy TLDs:** `.tk`, `.ml`, `.ga` (often free domains used for phishing)
- **Suspicious keywords:** Anything with "verify-account", "secure-login", "banking-secure" in the domain
- **Mixed content:** HTTPS page loading HTTP scripts (can inject malicious code)

**Allowlist stuff:**
```javascript
const trustedDomains = [
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net',
  'unpkg.com',
  'google-analytics.com',
  'googletagmanager.com',
  // ... more
];
```

### The iFrame Problem

iFrames are interesting because they can:
1. Render convincing login forms from external sources
2. Bypass same-origin policy in weird ways
3. Load content without changing the main page URL

My detection checks:
```javascript
function analyzeIframe(iframe) {
  const src = iframe.src;
  const parentDomain = window.location.hostname;
  const iframeDomain = new URL(src).hostname;

  // Is iframe from different domain?
  if (parentDomain !== iframeDomain) {
    // Check if it's loading sensitive-looking content
    if (iframe.contentWindow.document.querySelector('input[type="password"]')) {
      // Potential credential harvesting!
    }
  }
}
```

**Real challenge:** Can't always access iframe contents due to CORS. If the iframe is from a different origin, `iframe.contentWindow.document` throws a SecurityError.

So I'm also checking:
- iframe dimensions (1x1px iframes are often tracking pixels or worse)
- iframe positioning (negative margins to hide them)
- iframe source domain reputation

This is probably the messiest part of the code. Lots of edge cases, lots of false positives on legitimate sites.

**Real talk:** The automatic monitoring can be pretty trigger-happy. News sites especially will set it off constantly because they load SO many third-party resources. I made it opt-in for a reason - having alerts pop up on every other site gets annoying fast. Manual scanning is way more reliable.

## Mixed Content Taught Me About Security Context

Browsers will throw a warning about "mixed content" but honestly I didn't fully get what that meant until I dug into it.

### The Breakdown

When you're on an HTTPS site, your connection to that server is encrypted. But if that HTTPS page loads resources over HTTP, those resources can be intercepted/modified by anyone on the network.

**Two types:**

**1. Passive Mixed Content** (images, video, audio):
```html
<!-- HTTPS page loading HTTP image -->
<img src="http://example.com/photo.jpg">
```
Risk level: Medium. Someone could swap the image, but can't run code.

**2. Active Mixed Content** (scripts, stylesheets, iframes):
```html
<!-- HTTPS page loading HTTP script - BIG PROBLEM -->
<script src="http://example.com/app.js"></script>
```
Risk level: Critical. That script can:
- Steal cookies/tokens
- Modify the page content
- Capture form inputs
- Do basically anything

### How I Detect It

I'm checking all resource loads against the current page's protocol:

```typescript
function checkMixedContent(resourceUrl: string): boolean {
  const pageProtocol = window.location.protocol; // 'https:'
  const resourceProtocol = new URL(resourceUrl).protocol;

  if (pageProtocol === 'https:' && resourceProtocol === 'http:') {
    // Mixed content detected!
    return true;
  }
  return false;
}
```

Modern browsers actually block active mixed content by default now, but I'm still checking because:
1. Not all users have updated browsers
2. Some browsers allow it with warnings
3. It's a sign of poor site security practices

**Real-world example I found:**
A phishing site cloned Bank of America's login page but loaded their logo from `http://` instead of `https://`. Dead giveaway - the real BoA site wouldn't make that mistake.

## Domain Age Turned Out Pretty Reliable

This one was simpler than I expected. Most phishing operations are hit-and-run - register domain, use for a week, get reported, domain dies.

I'm using WHOIS APIs to get registration dates:
```javascript
async function getDomainAge(domain) {
  const response = await fetch(`https://jsonwhois.com/api/v1/whois?domain=${domain}`);
  const data = await response.json();
  const createdDate = new Date(data.created);
  const ageInDays = (Date.now() - createdDate) / (1000 * 60 * 60 * 24);
  return ageInDays;
}
```

My scoring:
- < 7 days: +25 points (huge red flag)
- < 30 days: +15 points
- < 90 days: +10 points

Legitimate sites can obviously be new too, but combined with other signals (sketchy TLD, suspicious keywords, fresh cert), domain age adds a lot of confidence to the detection.

**WHOIS headaches:**
- Rate limits (had to implement caching)
- Different response formats per registrar
- GDPR made a lot of WHOIS data private
- Some TLDs don't expose creation dates
- Timeouts on slow registrars

## What I'm Still Figuring Out

Honestly, this project made me realize how much I don't know:

**Content-based detection** - I'm barely scratching the surface. Things I want to add:
- Detecting fake login forms (multiple password inputs on one page)
- Brand logo recognition
- Text analysis for urgent language ("Your account will be closed!")
- DOM structure comparison to known legitimate sites

**Visual similarity** - Some research papers use computer vision to compare screenshots of suspected phishing sites to real ones. Sounds cool but probably requires more processing power than a browser extension should use.

**Machine learning** - I've been reading papers on ML-based phishing detection. Most train on datasets of URL features, DOM properties, and visual characteristics. Problem: ML models are huge and I want to keep the extension lightweight. Maybe I could use a lighter model or do the heavy lifting on a server? Still researching.

## Biggest Lesson

That green lock icon doesn't mean what I thought it meant. It just means "encrypted connection," not "trustworthy site."

Modern phishing uses proper HTTPS, convincing designs, and sometimes even passes basic security checks. You need to look at context - certificate age, domain age, suspicious patterns - that browsers don't show you.

I'm pretty sure I'm missing obvious stuff too. This is my first real extension and my first deep dive into web security. Code's a mess in places. But it works, and I learned a ton.

**Full transparency:** I used AI (ChatGPT/Claude) a LOT during development. This is a side project, and I was learning as I went. That means:
- Some patterns might be non-standard
- There are probably better approaches I didn't discover
- Edge cases I haven't thought of
- Code that works but could be cleaner

AI was super helpful for understanding concepts and generating boilerplate, but it also meant I sometimes implemented things without fully understanding them at first. Had to go back and refactor a bunch when I realized what was actually happening under the hood.

**TypeScript and React were clutch** - I initially thought vanilla JS would be simpler, but once the state management got complex (tracking multiple scans, caching results, managing notifications), React saved me. TypeScript caught so many bugs before runtime.

## What's Next for Phish-Guard

- Improve form detection (especially credential harvesting)
- Better handling of false positives
- More comprehensive pattern database
- Maybe user reporting for missed phishing sites
- Performance optimization (some scans are kinda slow)

Code's on [GitHub](https://github.com/IlmHe/Phish-Guard) if you want to check it out or contribute. Don't expect clean code - it's my first extension and I was learning as I went. But I'm open to suggestions and PRs!

---

*Got ideas for better detection methods? Know techniques I missed? I'd love to hear about them. Still very much learning here.*
