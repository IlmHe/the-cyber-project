// Terminal Commands - All Command Implementations
(function() {
  'use strict';

  const { printLine, clearScreen } = window.terminalCore;

  // Command Registry
  const commands = {

    // ===== HELP & INFO COMMANDS =====

    help: function(args, state) {
      printLine(`Available commands:

INFORMATION:
  about       - About me
  skills      - Technical skills & expertise
  contact     - Contact information
  projects    - My projects & work

NAVIGATION:
  ls [dir]    - List directory contents
  cd <dir>    - Change directory (.. for parent, / for root)
  pwd         - Print working directory
  cat <file>  - Display file contents

UTILITIES:
  env         - Show environment variables
  base64 <str> - Decode base64 string
  strings <file> - Display strings from file
  unlock <pass> - Unlock protected directory

  clear       - Clear terminal screen
  history     - Show command history
  whoami      - Who are you?

TIPS:
  - Use arrow keys (↑/↓) to navigate command history
  - Press Ctrl+C to cancel current input
  - Press Ctrl+L to clear screen
`);
    },

    // ===== NAVIGATION COMMANDS =====

    ls: function(args, state) {
      const targetDir = args[0] ? resolvePath(args[0], state.currentDir) : state.currentDir;
      const dirContent = CV_DATA.filesystem[targetDir];

      if (!dirContent) {
        printLine(`ls: cannot access '${args[0]}': No such directory`, 'error');
        return;
      }

      printLine('');
      for (const [name, value] of Object.entries(dirContent)) {
        // Skip internal metadata
        if (name.startsWith('_')) continue;

        // Check if it's a directory (ends with /)
        const isDir = name.endsWith('/');

        if (isDir) {
          if (value === '_locked_directory_') {
            // Check if unlocked
            if (state.unlockedDirs.includes(name.replace('/', ''))) {
              printLine(`  🔓 ${name}`, 'directory');
            } else {
              printLine(`  🔒 ${name}`, 'locked');
            }
          } else {
            printLine(`  📁 ${name}`, 'directory');
          }
        } else {
          printLine(`  📄 ${name}`, 'file');
        }
      }
      printLine('');
    },

    cd: function(args, state) {
      if (!args[0]) {
        state.currentDir = '/';
        return;
      }

      // Remove trailing slash for consistency
      const arg = args[0].replace(/\/$/, '');
      const targetDir = resolvePath(arg, state.currentDir);

      // Check if directory exists
      if (!CV_DATA.filesystem[targetDir]) {
        printLine(`cd: ${args[0]}: No such directory`, 'error');
        return;
      }

      const dirContent = CV_DATA.filesystem[targetDir];

      // Check if locked
      if (dirContent._locked && !state.unlockedDirs.includes(targetDir.split('/').pop())) {
        printLine(dirContent._hint, 'warning');
        return;
      }

      state.currentDir = targetDir;
    },

    pwd: function(args, state) {
      printLine(state.currentDir);
    },

    cat: function(args, state) {
      if (!args[0]) {
        printLine('cat: missing file operand', 'error');
        return;
      }

      const filePath = resolveFilePath(args[0], state.currentDir);
      const content = getFileContent(filePath);

      if (content === null) {
        printLine(`cat: ${args[0]}: No such file`, 'error');
        return;
      }

      if (content === '_directory_' || content === '_locked_directory_') {
        printLine(`cat: ${args[0]}: Is a directory`, 'error');
        return;
      }

      if (content === '_binary_image_file_') {
        printLine(`cat: ${args[0]}: Binary file (use 'strings' to extract text)`, 'warning');
        return;
      }

      printLine('');
      printLine(content);
      printLine('');
    },

    // ===== INFO COMMANDS =====

    about: function(args, state) {
      printLine('');
      printLine(CV_DATA.personal.name);
      printLine('');
      printLine(CV_DATA.personal.title);
      printLine('Location: ' + CV_DATA.personal.location);
      printLine('');
      printLine('About Me');
      printLine('========');
      printLine('');
      printLine(CV_DATA.filesystem['/']['about.txt']);
      printLine('');
    },

    skills: function(args, state) {
      printLine('');
      printLine('TECHNICAL SKILLS');
      printLine('='.repeat(50));
      printLine('');

      printLine('Security:');
      CV_DATA.skills.security.forEach(skill => printLine(`  • ${skill}`));
      printLine('');

      printLine('Languages:');
      CV_DATA.skills.languages.forEach(skill => printLine(`  • ${skill}`));
      printLine('');

      printLine('Tools & Platforms:');
      CV_DATA.skills.tools.forEach(skill => printLine(`  • ${skill}`));
      printLine('');
    },

    contact: function(args, state) {
      printLine('');
      printLine('CONTACT INFORMATION');
      printLine('='.repeat(50));
      printLine('');
      printLine('Email:    ' + CV_DATA.personal.email);
      printLine('GitHub:   github.com/' + CV_DATA.personal.github);
      printLine('LinkedIn: linkedin.com/in/' + CV_DATA.personal.linkedin);
      printLine('Website:  heinonen.monster');
      printLine('');
      printLine('Feel free to reach out for collaborations, opportunities, or security chats!');
      printLine('');
    },

    projects: function(args, state) {
      printLine('');
      printLine('MY PROJECTS');
      printLine('='.repeat(50));
      printLine('');
      printLine('Use \'cd projects\' and \'cat <filename>\' to explore each project.');
      printLine('');
      printLine('Available projects:');
      printLine('  📁 phish-guard.md        - Anti-phishing Chrome extension');
      printLine('  📁 breach-timeline.md    - Interactive breach visualization');
      printLine('  📁 the-cyber-project.md  - This website!');
      printLine('  📁 ctf-writeups.md       - CTF challenge solutions');
      printLine('');
    },

    // ===== PUZZLE COMMANDS =====

    env: function(args, state) {
      printLine('');
      for (const [key, value] of Object.entries(CV_DATA.environment)) {
        printLine(`${key}=${value}`);
      }
      printLine('');
    },

    base64: function(args, state) {
      if (!args[0]) {
        printLine('Usage: base64 <string>', 'error');
        return;
      }

      const input = args.join(' ');

      try {
        const decoded = atob(input);
        printLine('');
        printLine(decoded, 'success');

        // Give hint if it's a filename
        if (decoded.endsWith('.png') || decoded.endsWith('.jpg') || decoded.endsWith('.txt')) {
          printLine('');
          printLine('💡 Hint: This looks like a filename. Try using other commands to investigate it...', 'info');
        }

        printLine('');
      } catch (e) {
        printLine('base64: invalid input', 'error');
      }
    },

    strings: function(args, state) {
      if (!args[0]) {
        printLine('Usage: strings <file>', 'error');
        return;
      }

      const filename = args[0];
      const metadata = CV_DATA.imageMetadata[filename];

      if (!metadata) {
        printLine(`strings: ${filename}: No such file or not a binary`, 'error');
        return;
      }

      printLine('');
      printLine(`Strings from ${filename}:`, 'info');
      printLine('');

      metadata.strings.forEach(str => {
        printLine(str);
      });

      printLine('');
      printLine('💡 Hint: Found something interesting? Try decoding it with base64...', 'info');
      printLine('');
    },

    unlock: function(args, state) {
      if (!args[0]) {
        printLine('Usage: unlock <password>', 'error');
        return;
      }
      const password = args[0].trim().toLowerCase();
      const correctPassword = (CV_DATA.filesystem['/secret_projects']._password || '').trim().toLowerCase();
      if (password === correctPassword) {
        if (!state.unlockedDirs.includes('secret_projects')) {
          state.unlockedDirs.push('secret_projects');
        }
        printLine('');
        printLine('✅ Access granted to secret_projects/', 'success');
        printLine('');
        printLine('🎉 Achievement Unlocked: Code Breaker!', 'success');
        printLine('');
        printLine('You can now \'cd secret_projects\' to explore the hidden content.');
        printLine('');
      } else {
        printLine('');
        printLine('❌ Incorrect password.', 'error');
        printLine('');
        printLine('Hint: Have you explored all the projects? Check for hidden data...', 'info');
        printLine('');
      }
    },

    hint: function(args, state) {
      state.hintCount = (state.hintCount || 0) + 1;

      printLine('');
      if (state.hintCount === 1) {
        printLine('💡 Hint #1: Check the environment variables with \'env\'', 'info');
      } else if (state.hintCount === 2) {
        printLine('💡 Hint #2: Explore the projects directory. Look for encoded data.', 'info');
      } else if (state.hintCount === 3) {
        printLine('💡 Hint #3: Some project files contain base64 encoded strings. Try decoding them.', 'info');
      } else if (state.hintCount === 4) {
        printLine('💡 Hint #4: Once decoded, you might get a filename. Use \'strings\' on it.', 'info');
      } else {
        printLine('💡 Final Hint: The password is hidden in profile.png metadata. Use strings + base64.', 'info');
      }
      printLine('');
    },

    // ===== UTILITY COMMANDS =====

    clear: function(args, state) {
      clearScreen();
    },

    history: function(args, state) {
      printLine('');
      if (state.commandHistory.length === 0) {
        printLine('No command history yet.');
      } else {
        state.commandHistory.forEach((cmd, i) => {
          printLine(`  ${i + 1}  ${cmd}`);
        });
      }
      printLine('');
    },

    whoami: function(args, state) {
      printLine('');
      printLine(CV_DATA.easterEggs.whoami, 'info');
      printLine('');
    },

    // ===== EASTER EGGS =====

    sudo: function(args, state) {
      printLine('');
      printLine(CV_DATA.easterEggs.sudo, 'warning');
      printLine('');
    },

    hack: function(args, state) {
      printLine('');
      printLine(CV_DATA.easterEggs.hack, 'warning');
      printLine('');
    },

    coffee: function(args, state) {
      printLine('');
      printLine(CV_DATA.easterEggs.coffee, 'success');
      printLine('');
    },

    exit: function(args, state) {
      printLine('');
      printLine('Nice try, but you can\'t escape that easily! 😄', 'info');
      printLine('Just close the browser tab if you really want to leave.');
      printLine('');
    },

    monster: function(args, state) {
      printLine('');
      printLine('        ⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛⬛⬜⬜⬜⬜');
      printLine('        ⬜⬜⬜⬜⬛⬛🟩🟩🟩🟩🟩⬛⬛⬜⬜⬜');
      printLine('        ⬜⬜⬜⬛🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩🟩⬛⬛⬛🟩🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩⬛⬛🟩🟩⬛🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩🟩⬛⬛⬛🟩🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜');
      printLine('        ⬜⬜⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛⬜⬜');
      printLine('        ⬜⬜⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜');
      printLine('');
      printLine('        🎮 Achievement Unlocked: Caffeine Powered!', 'success');
      printLine('');
      printLine('        Unleash the beast! ⚡💚', 'info');
      printLine('');
    }
  };

  // ===== HELPER FUNCTIONS =====

  function resolvePath(path, currentDir) {
    if (path === '/') return '/';
    if (path === '~') return '/';
    if (path === '.') return currentDir;
    if (path === '..') {
      if (currentDir === '/') return '/';
      const parts = currentDir.split('/').filter(p => p);
      parts.pop();
      return '/' + parts.join('/');
    }

    // Absolute path
    if (path.startsWith('/')) {
      return path.endsWith('/') ? path.slice(0, -1) : path;
    }

    // Relative path
    if (currentDir === '/') {
      return '/' + path;
    }
    return currentDir + '/' + path;
  }

  function resolveFilePath(filename, currentDir) {
    if (filename.includes('/')) {
      return filename;
    }
    return { dir: currentDir, file: filename };
  }

  function getFileContent(filePath) {
    if (typeof filePath === 'object') {
      const { dir, file } = filePath;
      const dirContent = CV_DATA.filesystem[dir];
      return dirContent ? dirContent[file] || null : null;
    }

    // Handle absolute path like /projects/file.md
    const parts = filePath.split('/').filter(p => p);
    const filename = parts.pop();
    const dir = '/' + parts.join('/');
    const dirContent = CV_DATA.filesystem[dir] || CV_DATA.filesystem['/' + parts[0]];

    return dirContent ? dirContent[filename] || null : null;
  }

  // Expose commands to window
  window.terminalCommands = commands;
})();
