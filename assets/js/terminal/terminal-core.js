// Terminal Core Engine - Input/Output and State Management
(function() {
  'use strict';

  // Terminal State
  const state = {
    currentDir: "/",
    inputBuffer: "",
    commandHistory: [],
    historyIndex: -1,
    unlockedDirs: [],
    hintCount: 0
  };

  // DOM Elements
  let outputElement;
  let inputElement;
  let promptElement;
  let containerElement;

  // Initialize Terminal
  function initTerminal() {
    // Get DOM elements
    outputElement = document.getElementById('terminal-output');
    inputElement = document.getElementById('terminal-input');
    promptElement = document.getElementById('terminal-prompt');
    containerElement = document.getElementById('terminal-container');

    // Display welcome banner
    displayWelcomeBanner();

    // Attach keyboard listener
    document.addEventListener('keydown', handleKeyboard);

    // Focus terminal on click
    containerElement.addEventListener('click', () => {
      containerElement.focus();
    });

    // Load command history from localStorage
    loadHistory();

    // Make terminal focusable
    containerElement.setAttribute('tabindex', '0');
    containerElement.focus();
  }

  // Display ASCII Welcome Banner
  function displayWelcomeBanner() {
    const banner = `
██╗  ██╗███████╗██╗███╗   ██╗ ██████╗ ███╗   ██╗███████╗███╗   ██╗
██║  ██║██╔════╝██║████╗  ██║██╔═══██╗████╗  ██║██╔════╝████╗  ██║
███████║█████╗  ██║██╔██╗ ██║██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║
██╔══██║██╔══╝  ██║██║╚██╗██║██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║
██║  ██║███████╗██║██║ ╚████║╚██████╔╝██║ ╚████║███████╗██║ ╚████║
╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝

Welcome to my interactive CV terminal!
Type 'help' to see available commands.
`;
    printLine(banner, 'banner');
    printLine('');
  }

  // Handle Keyboard Input
  function handleKeyboard(event) {
    // Ignore if user is typing in another input field
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }

    switch(event.key) {
      case 'Enter':
        event.preventDefault();
        handleEnter();
        break;

      case 'Backspace':
        event.preventDefault();
        handleBackspace();
        break;

      case 'ArrowUp':
        event.preventDefault();
        navigateHistory(-1);
        break;

      case 'ArrowDown':
        event.preventDefault();
        navigateHistory(1);
        break;

      case 'Tab':
        event.preventDefault();
        // Tab completion - future feature
        break;

      case 'l':
        // Ctrl+L to clear
        if (event.ctrlKey) {
          event.preventDefault();
          executeCommand('clear');
        } else {
          handleCharacter(event.key);
        }
        break;

      case 'c':
        // Ctrl+C to cancel current input
        if (event.ctrlKey) {
          event.preventDefault();
          printLine(state.inputBuffer + '^C');
          clearInput();
          printPrompt();
        } else {
          handleCharacter(event.key);
        }
        break;

      default:
        // Only handle printable characters
        if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
          event.preventDefault();
          handleCharacter(event.key);
        }
    }
  }

  // Handle Enter Key
  function handleEnter() {
    const command = state.inputBuffer.trim();

    // Print the command
    printLine(getPromptText() + ' ' + state.inputBuffer, 'command-line');

    // Clear input display
    inputElement.textContent = '';

    // Add to history if not empty
    if (command) {
      addToHistory(command);
      executeCommand(command);
    } else {
      printPrompt();
    }

    // Clear input buffer
    clearInput();
  }

  // Handle Backspace
  function handleBackspace() {
    if (state.inputBuffer.length > 0) {
      state.inputBuffer = state.inputBuffer.slice(0, -1);
      inputElement.textContent = state.inputBuffer;
    }
  }

  // Handle Character Input
  function handleCharacter(char) {
    state.inputBuffer += char;
    inputElement.textContent = state.inputBuffer;
  }

  // Execute Command
  function executeCommand(input) {
    const parts = input.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Debug log
    console.log('Executing command:', command, 'Args:', args);
    console.log('Commands available:', window.terminalCommands ? Object.keys(window.terminalCommands) : 'undefined');

    // Route to command handler
    if (window.terminalCommands && typeof window.terminalCommands[command] === 'function') {
      try {
        window.terminalCommands[command](args, state);
      } catch (error) {
        printLine(`Error executing command: ${error.message}`, 'error');
        console.error('Command error:', error);
      }
    } else if (command) {
      printLine(`Command not found: ${command}`, 'error');
      printLine(`Type 'help' for available commands.`);
    }

    // Show new prompt
    printPrompt();
  }

  // Navigate Command History
  function navigateHistory(direction) {
    if (state.commandHistory.length === 0) return;

    // Update history index
    state.historyIndex += direction;

    // Clamp index
    if (state.historyIndex < 0) {
      state.historyIndex = 0;
    } else if (state.historyIndex >= state.commandHistory.length) {
      state.historyIndex = state.commandHistory.length;
      state.inputBuffer = '';
      inputElement.textContent = '';
      return;
    }

    // Update input with history
    state.inputBuffer = state.commandHistory[state.historyIndex];
    inputElement.textContent = state.inputBuffer;
  }

  // Add Command to History
  function addToHistory(command) {
    state.commandHistory.push(command);
    state.historyIndex = state.commandHistory.length;
    saveHistory();
  }

  // Save History to LocalStorage
  function saveHistory() {
    try {
      localStorage.setItem('terminal_history', JSON.stringify(state.commandHistory.slice(-50)));
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  // Load History from LocalStorage
  function loadHistory() {
    try {
      const saved = localStorage.getItem('terminal_history');
      if (saved) {
        state.commandHistory = JSON.parse(saved);
        state.historyIndex = state.commandHistory.length;
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  // Print Line to Terminal
  function printLine(text, className = '') {
    const line = document.createElement('div');
    line.className = className;

    // Preserve formatting (spaces, newlines)
    if (text.includes('\n')) {
      line.style.whiteSpace = 'pre-wrap';
    }

    line.textContent = text;
    outputElement.appendChild(line);
    scrollToBottom();
  }

  // Print Prompt
  function printPrompt() {
    // Update prompt text
    promptElement.textContent = getPromptText() + ' ';
  }

  // Get Current Prompt Text
  function getPromptText() {
    const user = CV_DATA.personal.prompt || 'visitor@terminal';
    const dir = state.currentDir === '/' ? '~' : '~' + state.currentDir;
    return `${user}:${dir}$`;
  }

  // Clear Input Buffer
  function clearInput() {
    state.inputBuffer = '';
    inputElement.textContent = '';
  }

  // Scroll to Bottom
  function scrollToBottom() {
    containerElement.scrollTop = containerElement.scrollHeight;
  }

  // Expose functions to window for commands to use
  window.terminalCore = {
    printLine: printLine,
    printPrompt: printPrompt,
    getState: () => state,
    clearScreen: () => {
      outputElement.innerHTML = '';
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminal);
  } else {
    initTerminal();
  }
})();
