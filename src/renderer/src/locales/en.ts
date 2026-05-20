/* eslint-disable max-lines */
export const en = {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    confirm: 'Confirm',
    loading: 'Loading',
    browse: 'Browse',
    restart: 'Restart',
    update: 'Update',
    check: 'Check',
    install: 'Install',
    enabled: 'Enabled',
    disabled: 'Disabled',
    reset: 'Reset',
    discard: 'Discard',
    saving: 'Saving',
    refresh: 'Refresh',
    clear: 'Clear',
    remove: 'Remove'
  },
  settings: {
    nav: {
      general: {
        title: 'General',
        description: 'Workspace, editor, and app defaults.'
      },
      agents: {
        title: 'Agents',
        description: 'Default agent and command overrides.'
      },
      accounts: {
        title: 'Accounts',
        description: 'GitHub and GitLab authentication.'
      },
      integrations: {
        title: 'Integrations',
        description: 'GitHub, GitLab, Linear, and more.'
      },
      git: {
        title: 'Git',
        description: 'Branch prefix, base ref, and commit message AI.'
      },
      tasks: {
        title: 'Tasks',
        description: 'GitHub, GitLab, and Linear task sources.'
      },
      appearance: {
        title: 'Appearance',
        description: 'Theme, zoom, fonts, and layout.'
      },
      input: {
        title: 'Input',
        description: 'Mouse and keyboard behavior.'
      },
      terminal: {
        title: 'Terminal',
        description: 'Shell, rendering, and quick commands.'
      },
      browser: {
        title: 'Browser',
        description: 'Home page, search engine, and cookies.'
      },
      notifications: {
        title: 'Notifications',
        description: 'Desktop alerts and sounds.'
      },
      orchestration: {
        title: 'Orchestration',
        description: 'Agent workflows and triggers.'
      },
      servers: {
        title: 'Servers',
        descriptionDesktop: 'Remote environments and runtimes.',
        descriptionWeb: 'Remote environments and runtimes (web).'
      },
      ssh: {
        title: 'SSH',
        description: 'Remote SSH connections.'
      },
      mobile: {
        title: 'Mobile',
        description: 'Pair your phone with Orca.'
      },
      computerUse: {
        title: 'Computer Use',
        description: 'Allow agents to control local apps.'
      },
      voice: {
        title: 'Voice',
        description: 'Dictation and speech-to-text.'
      },
      developerPermissions: {
        title: 'Developer Permissions',
        description: 'macOS privacy access for CLI tools.'
      },
      privacy: {
        title: 'Privacy',
        description: 'Telemetry and data sharing.'
      },
      shortcuts: {
        title: 'Shortcuts',
        description: 'Keyboard shortcuts reference.'
      },
      stats: {
        title: 'Stats',
        description: 'Usage statistics.'
      },
      experimental: {
        title: 'Experimental',
        description: 'Beta features and previews.'
      }
    },
    navGroups: {
      setup: 'Set Up',
      workflows: 'Workflows',
      interface: 'Interface',
      capabilities: 'AI Capabilities',
      remote: 'Remote Access',
      safety: 'Safety',
      experimental: 'Experimental',
      repositories: 'Repositories'
    },
    badge: {
      optional: 'Optional',
      beta: 'Beta'
    },
    noResults: 'No settings found for "{{query}}"',
    platform: {
      windows: 'Windows',
      linux: 'Linux',
      thisPlatform: 'This platform'
    },
    sections: {
      general: {
        title: 'General',
        description: 'Workspace defaults, app setup, and maintenance.'
      },
      agents: {
        title: 'Agents',
        description: 'Manage AI agents, set a default, and customize commands.'
      },
      accounts: {
        title: 'AI Provider Accounts',
        description:
          'Optional. Orca works with your existing provider logins; add accounts only if you want Orca to help switch between them.'
      },
      integrations: {
        title: 'Integrations',
        description: 'Connect GitHub, GitLab, Linear, and source-hosting services.'
      },
      git: {
        title: 'Git & Source Control',
        description: 'Branch naming, base refs, attribution, and AI commit messages.'
      },
      tasks: {
        title: 'Task Sources',
        description: 'Choose which task providers appear in the Tasks page and sidebar.'
      },
      terminal: {
        title: 'Terminal',
        description: 'Shells, terminal appearance, quick commands, and pane behavior.'
      },
      browser: {
        title: 'Browser',
        description: 'Home page, link routing, and session cookies.'
      },
      appearance: {
        title: 'Appearance',
        description: 'Theme, zoom, app font, sidebars, and status bar.'
      },
      input: {
        title: 'Input & Editing',
        description: 'Selection and editing behavior.'
      },
      notifications: {
        title: 'Notifications',
        description: 'Native desktop notifications for agent activity and terminal events.'
      },
      shortcuts: {
        title: 'Shortcuts',
        description: 'Keyboard shortcuts for common actions.'
      },
      stats: {
        title: 'Stats & Usage',
        description: 'Orca stats plus Claude, Codex, and OpenCode usage analytics.'
      },
      orchestration: {
        title: 'Orchestration',
        description: 'Coordinate multiple coding agents through Orca.'
      },
      ssh: {
        title: 'SSH Hosts',
        description: 'Remote SSH hosts for files, terminals, and git.'
      },
      developerPermissions: {
        title: 'macOS Permissions',
        description: 'macOS privacy access for terminal-launched developer tools.'
      },
      privacy: {
        title: 'Privacy & Telemetry',
        description: 'Anonymous usage data and telemetry controls.'
      },
      experimental: {
        title: 'Experimental',
        description: 'New features that are still taking shape. Give them a try.'
      },
      computerUse: {
        title: 'Computer Use',
        description: 'Enable agents to control any app on your computer.',
        previewAriaLabel: '{{platform}} Computer Use preview details',
        previewTooltip:
          '{{platform}} Computer Use is an early preview. Some apps and desktop environments may behave inconsistently.'
      },
      voice: {
        title: 'Voice',
        description: 'Local speech-to-text dictation with on-device models.'
      },
      servers: {
        title: 'Remote Orca Servers',
        descriptionDesktop: 'Switch between local desktop mode and paired remote Orca runtimes.',
        descriptionWeb: 'Connect this browser to a saved Orca server.'
      },
      mobile: {
        title: 'Mobile',
        description: 'Control terminals and agents from your phone.'
      }
    },
    general: {
      title: 'General',
      description: 'General application settings.',
      language: {
        label: 'Language',
        description: 'Select your preferred interface language.'
      },
      workspace: {
        title: 'Workspace',
        description: 'Configure workspace behavior and directories.',
        directory: {
          label: 'Directory',
          description: 'Default directory for new workspaces.'
        },
        nest: {
          label: 'Nest',
          description: 'Nest related workspaces under a parent folder.'
        },
        skipDeleteWorktreeConfirm: {
          label: 'Skip Delete Worktree Confirm',
          description: 'Skip confirmation when deleting a worktree.'
        },
        skipDeleteAutomationConfirm: {
          label: 'Skip Delete Automation Confirm',
          description: 'Skip confirmation when deleting an automation.'
        },
        askBeforeDeletingWorktrees: {
          label: 'Ask Before Deleting Worktrees',
          description: 'Show a confirmation dialog before deleting a worktree.'
        },
        askBeforeDeletingAutomations: {
          label: 'Ask Before Deleting Automations',
          description:
            'Show a confirmation dialog before deleting an automation and its run history.'
        }
      },
      openInMenu: {
        title: 'Open In Menu',
        description: 'Add custom launchers to the worktree Open in menu.',
        vsCodeIncluded:
          "VS Code is always included first. Add executables to show extra entries in each worktree's Open in menu.",
        commandNotShellParsed:
          'Commands are not shell-parsed. Use only an executable command name. For flags, use a wrapper script.',
        addCursor: 'Add Cursor',
        addZed: 'Add Zed',
        labelPlaceholder: 'Label',
        commandPlaceholder: 'Executable command',
        remove: 'Remove',
        addCustomLauncher: 'Add Custom Launcher'
      },
      editor: {
        title: 'Editor',
        description: 'Configure how Orca persists file edits.',
        autoSave: {
          label: 'Auto Save Files',
          description: 'Save editor and editable diff changes automatically after a short pause.'
        },
        autoSaveDelay: {
          label: 'Auto Save Delay',
          description: 'How long Orca waits after your last edit before saving automatically.',
          firstLaunchDefault: 'First launch defaults to {{default}} ms.'
        },
        defaultDiffView: {
          label: 'Default Diff View',
          description: 'Preferred presentation format for showing git diffs by default.',
          inline: 'Inline',
          sideBySide: 'Side-by-side'
        },
        defaultDiffFileTree: {
          label: 'Default Diff File Tree',
          description: 'Show or hide the file tree when opening combined diff views.',
          shown: 'Shown',
          hidden: 'Hidden'
        },
        minimap: {
          label: 'Minimap',
          description: 'Show the minimap overview when editing a file.'
        },
        markdownReviewNotes: {
          label: 'Markdown Review Notes',
          description:
            'Show local markdown note controls in rich editor mode and agent handoff actions.'
        }
      },
      cacheTimer: {
        title: 'Prompt Cache Timer',
        description:
          'Claude caches your conversation to reduce costs. When idle too long the cache expires and the next message resends full context at higher cost. This shows a countdown so you know when to resume.',
        cacheTimer: {
          label: 'Cache Timer',
          description: 'Show a countdown in the sidebar after a Claude agent becomes idle.'
        },
        timerDuration: {
          label: 'Timer Duration',
          description: "Match this to your provider's cache TTL. The default is 5 minutes."
        },
        fiveMinutes: '5 minutes',
        oneHour: '1 hour'
      },
      updates: {
        title: 'Updates',
        check: {
          label: 'Check',
          description: 'Check for updates manually or configure auto-check.'
        },
        idle: 'Updates are checked automatically on launch.',
        checking: 'Checking for updates...',
        notAvailable: "You're on the latest version.",
        errorCheck: 'Update check failed.',
        errorDownload: 'Update error.'
      },
      support: {
        title: 'Support',
        starGithub: {
          label: 'Star Github',
          description: 'Star the Orca project on GitHub.'
        },
        thanks: 'Thanks'
      }
    },
    appearance: {
      theme: {
        title: 'Theme',
        description: 'Choose between light, dark, or system theme.'
      },
      zoom: {
        title: 'Zoom',
        description: 'Adjust the global zoom level.'
      },
      typography: {
        title: 'Typography',
        description: 'Configure font and text rendering options.',
        label: 'Typography'
      },
      layout: {
        title: 'Layout',
        description: 'Customize the application layout.',
        rightSidebar: {
          label: 'Right Sidebar',
          description: 'Show or hide the right sidebar.'
        },
        gitIgnored: {
          label: 'Git Ignored',
          description: 'Show git-ignored files in the file explorer.'
        }
      },
      titlebar: {
        title: 'Title Bar',
        description: 'Configure the window title bar appearance.',
        appName: {
          label: 'App Name',
          description: 'Show the application name in the title bar.'
        }
      },
      statusBar: {
        title: 'Status Bar',
        description: 'Configure the status bar at the bottom of the window.'
      },
      sidebar: {
        title: 'Sidebar',
        tasksButton: {
          label: 'Tasks Button',
          description: 'Show the tasks button in the sidebar.'
        }
      }
    },
    input: {
      middleClickPaste: {
        label: 'Middle Click Paste',
        description: 'Paste clipboard content with middle mouse click.'
      }
    },
    shortcuts: {
      global: 'Global',
      tabs: 'Tabs',
      tabNavigation: 'Tab Navigation',
      terminalPanes: 'Terminal Panes',
      shortcut: 'Shortcut',
      ctrlTabOrder: {
        title: 'Ctrl+Tab Order',
        description: 'Order of tabs when using Ctrl+Tab to switch.',
        label: 'Ctrl Tab Order',
        helper: 'Configure Ctrl Tab Order settings.',
        mostRecent: 'Most Recent',
        tabStripOrder: 'Tab Strip Order'
      },
      title: 'Keyboard Shortcuts',
      subtitle: 'Subtitle'
    },
    terminal: {
      windowsShell: {
        title: 'Windows Shell',
        description: 'Default shell on Windows.'
      },
      floating: {
        title: 'Floating Terminal',
        description: 'Enable floating terminal window.',
        enable: 'Enable',
        enableDescription: 'Enable Description',
        defaultDirectory: 'Default Directory',
        defaultDirectoryDescription: 'Default Directory Description',
        toggleLocation: 'Toggle Location'
      },
      quickCommands: {
        title: 'Quick Commands',
        description: 'Quick access commands for the terminal.'
      },
      typography: {
        title: 'Typography',
        description: 'Terminal font and text rendering options.',
        fontSize: 'Font Size',
        fontFamily: 'Font Family',
        fontWeight: 'Font Weight',
        lineHeight: 'Line Height'
      },
      rendering: {
        title: 'Rendering',
        description: 'Terminal rendering engine settings.',
        gpuAcceleration: 'Gpu Acceleration'
      },
      cursor: {
        title: 'Cursor',
        description: 'Terminal cursor style and behavior.',
        shape: 'Shape'
      },
      paneStyling: {
        title: 'Pane Styling',
        description: 'Styling options for terminal panes.'
      },
      setupScript: {
        title: 'Setup Script',
        description: 'Script to run when opening a new terminal.'
      },
      advanced: {
        title: 'Advanced',
        description: 'Advanced terminal configuration options.'
      }
    },
    integrations: {
      search: {
        github: {
          title: 'GitHub Integration',
          description: 'GitHub authentication via the gh CLI.'
        },
        gitlab: {
          title: 'GitLab Integration',
          description: 'GitLab authentication via the glab CLI.'
        },
        bitbucket: {
          title: 'Bitbucket Integration',
          description: 'Bitbucket Cloud authentication via API token environment variables.'
        },
        azureDevOps: {
          title: 'Azure DevOps Integration',
          description: 'Azure DevOps Repos authentication via token environment variables.'
        },
        gitea: {
          title: 'Gitea Integration',
          description: 'Gitea authentication via API token environment variables.'
        },
        linear: {
          title: 'Linear Integration',
          description: 'Connect Linear to browse and link issues.'
        }
      },
      status: {
        connected: 'Connected',
        notInstalled: 'Not installed',
        notAuthenticated: 'Not authenticated',
        notConfigured: 'Not configured',
        authFailed: 'Auth failed',
        configured: 'Configured',
        optionalSetup: 'Optional setup'
      },
      github: {
        description: 'Pull requests, issues, and checks via the {{cli}} CLI.',
        installPrompt: 'Install the GitHub CLI to enable pull requests, issues, and checks.',
        authPrompt:
          'The GitHub CLI is installed but not authenticated. Run this command in a terminal:'
      },
      gitlab: {
        description: 'Merge requests, issues, todos, and pipelines via the {{cli}} CLI.',
        installPrompt: 'Install the GitLab CLI to enable merge requests, issues, and pipelines.',
        authPrompt:
          'The GitLab CLI is installed but not authenticated. Run this command in a terminal:'
      },
      bitbucket: {
        descriptionConnected: '{{account}} · Pull requests and build statuses',
        descriptionConnectedNoAccount: 'Pull requests and build statuses',
        descriptionDefault: 'Pull requests and build statuses via Bitbucket Cloud API tokens.',
        configPrompt: 'Set {{emailVar}} and {{tokenVar}}, or set {{accessTokenVar}}.',
        authFailedPrompt:
          'Bitbucket credentials are configured but could not authenticate. Check the token and repository permissions, then restart Orca if environment variables changed.'
      },
      azureDevOps: {
        descriptionConnected: '{{account}} · Pull requests and build statuses',
        descriptionBaseUrl: '{{baseUrl}} · Pull requests and build statuses',
        descriptionDefault: 'Pull requests and build statuses for detected Azure Repos',
        descriptionUnconfigured:
          'Pull requests and build statuses via Azure DevOps REST API tokens.',
        configPrompt:
          'Set {{tokenVar}}, or set {{accessTokenVar}}. Set {{baseUrlVar}} only when Orca cannot derive the API base URL from the git remote.',
        authFailedPrompt:
          'Azure DevOps credentials are configured but could not authenticate. Check the token, API base URL, and repository permissions, then restart Orca if environment variables changed.'
      },
      gitea: {
        descriptionConnected: '{{account}} · Pull requests and commit statuses',
        descriptionBaseUrl: '{{baseUrl}} · Pull requests and commit statuses',
        descriptionDefault: 'Pull requests and commit statuses for detected repositories',
        descriptionUnconfigured: 'Pull requests and commit statuses via the Gitea REST API.',
        configPrompt:
          'Public repositories are detected from their git remote. Set {{tokenVar}} for private repositories, and set {{baseUrlVar}} only when Orca cannot derive the API URL from the remote.',
        authFailedPrompt:
          'Gitea credentials are configured but could not authenticate. Check the token, API base URL, and repository permissions, then restart Orca if environment variables changed.'
      },
      linear: {
        descriptionUnconnected: 'Browse and link issues to workspaces.',
        workspaceConnected: 'workspace connected',
        workspacesConnected: 'workspaces connected',
        addWorkspace: 'Add workspace',
        connect: 'Connect',
        verified: 'Verified',
        test: 'Test',
        testing: 'Testing…',
        disconnectWorkspaceAriaLabel: 'Disconnect {{name}}',
        workspaceApiKeyNote: 'Each workspace uses its own locally stored API key.',
        dialog: {
          title: 'Connect Linear workspace',
          descriptionPrefix: 'Paste a ',
          personalApiKey: 'Personal API key',
          descriptionSuffix: ' to add a workspace to Orca.',
          createKeyPrefix: 'Create one in ',
          linearSettingsSecurity: 'Linear Settings → Security',
          newApiKey: 'New API key',
          createKeySuffix: '(not {{passkey}}).',
          newPasskey: 'New passkey',
          securityNote: 'Your key is encrypted via the OS keychain and stored locally.',
          cancel: 'Cancel',
          verifying: 'Verifying…',
          connect: 'Connect'
        }
      },
      button: {
        installGithubCli: 'Install GitHub CLI',
        installGitlabCli: 'Install GitLab CLI',
        learnMore: 'Learn more',
        reCheck: 'Re-check'
      },
      error: {
        connectionFailed: 'Connection failed'
      }
    },
    agents: {
      command: 'Command',
      detected: 'Detected',
      notInstalled: 'Not Installed',
      defaultAgent: 'Default Agent',
      setAsDefault: 'Set As Default',
      default: 'Default',
      setDefault: 'Set Default',
      customizeCommand: 'Customize Command',
      overrideHint: 'Override Hint',
      defaultAgentTitle: 'Default Agent Title',
      defaultAgentDescription: 'Default Agent Description',
      auto: 'Auto',
      noAgent: 'No Agent',
      installed: 'Installed',
      detectedCount: 'Detected Count',
      refreshTooltip: 'Refresh Tooltip',
      refreshing: 'Refreshing',
      refresh: 'Refresh',
      availableToInstall: 'Available To Install',
      agentCount: 'Agent Count',
      detecting: 'Detecting'
    },
    browserUse: {
      cliLoadError: 'Cli Load Error',
      cliRegistered: 'Cli Registered',
      cliRegisterFailed: 'Cli Register Failed',
      copySuccess: 'Copy Success',
      copyFailed: 'Copy Failed',
      importCookiesSuccess: 'Import Cookies Success',
      importFileSuccess: 'Import File Success',
      enableAria: 'Enable Aria',
      title: 'Browser Use',
      subtitleOff: 'Subtitle Off',
      subtitleOn: 'Subtitle On',
      existingSession: 'Existing Session',
      existingSessionDescription: 'Existing Session Description',
      openComputerUse: 'Open Computer Use',
      step1: {
        title: 'Step 1: Configure CLI',
        description: 'Configure the Orca CLI for browser automation.',
        label: 'Step1',
        helper: 'Configure Step1 settings.',
        registering: 'Registering',
        enabled: 'Enabled',
        enable: 'Enable'
      },
      step2: {
        title: 'Step 2: Install Extension',
        description: 'Install the browser extension.'
      },
      step3: {
        title: 'Step 3: Configure AI',
        description: 'Configure AI settings for browser automation.',
        label: 'Step3',
        helper: 'Configure Step3 settings.'
      },
      lastImported: 'Last Imported',
      manageProfiles: 'Manage Profiles',
      reimport: 'Reimport',
      import: 'Import',
      fromBrowser: 'From Browser',
      fromFile: 'From File'
    },
    commitMessageAi: {
      enabled: {
        title: 'Enabled',
        description: 'Enable AI-generated commit messages.',
        label: 'Enabled',
        helper: 'Configure Enabled settings.'
      },
      agent: {
        title: 'Agent',
        description: 'Select the AI agent for commit messages.',
        label: 'Agent',
        helper: 'Configure Agent settings.',
        notConfigured: 'Not Configured',
        custom: 'Custom',
        unsupportedDefault: 'Unsupported Default'
      },
      customCommand: {
        title: 'Custom Command',
        description: 'Custom command to generate commit messages.',
        label: 'Custom Command'
      },
      model: {
        title: 'Model',
        description: 'AI model to use for commit message generation.',
        label: 'Model',
        helper: 'Configure Model settings.'
      },
      thinking: {
        title: 'Thinking',
        description: 'Show AI thinking process for commit messages.',
        label: 'Thinking',
        helper: 'Configure Thinking settings.'
      },
      customPrompt: {
        title: 'Custom Prompt',
        description: 'Custom prompt template for commit messages.',
        label: 'Custom Prompt',
        helper: 'Configure Custom Prompt settings.',
        placeholder: 'Placeholder',
        unsaved: 'Unsaved',
        saved: 'Saved'
      },
      sectionTitle: 'Section Title',
      sectionDescription: 'Section Description'
    },
    computerUse: {
      loadError: 'Load Error',
      openedSettings: 'Opened Settings',
      macosOnly: 'Macos Only',
      openError: 'Open Error',
      copySuccess: 'Copy Success',
      copyError: 'Copy Error',
      header: 'Header',
      subtitle: 'Subtitle',
      unavailableReason: 'Unavailable Reason',
      opening: 'Opening',
      open: 'Open',
      installSkill: {
        title: 'Install Skill',
        description: 'Install a skill for computer use automation.'
      },
      copyAria: 'Copy Aria'
    },
    developerPermissions: {
      status: {
        granted: 'Granted',
        denied: 'Denied',
        notDetermined: 'Not Determined',
        restricted: 'Restricted',
        unsupported: 'Unsupported',
        ready: 'Ready',
        unknown: 'Unknown'
      },
      loadError: 'Load Error',
      permissionGranted: 'Permission Granted',
      openedSystemSettings: 'Opened System Settings',
      permissionRequestSent: 'Permission Request Sent',
      requestError: 'Request Error',
      header: 'Header',
      subtitle: 'Subtitle',
      working: 'Working'
    },
    experimental: {
      pet: {
        title: 'Pet Mode',
        description: 'Enable the virtual pet companion.',
        label: 'Pet',
        helper: 'Configure Pet settings.'
      },
      agentsView: {
        title: 'Agents View',
        description: 'Enable the experimental agents view.',
        label: 'Agents View',
        helper: 'Configure Agents View settings.'
      },
      symlinks: {
        title: 'Symlinks',
        description: 'Enable symlink support in the file explorer.',
        label: 'Symlinks',
        helper: 'Configure Symlinks settings.'
      }
    },
    git: {
      branchPrefix: {
        title: 'Branch Prefix',
        description: 'Prefix for new branch names.',
        gitUsername: 'Git Username',
        custom: 'Custom',
        none: 'None'
      },
      refreshLocalBaseRef: {
        title: 'Refresh Local Base Ref',
        description: 'Automatically refresh local base reference.',
        label: 'Refresh Local Base Ref',
        helper: 'Configure Refresh Local Base Ref settings.'
      },
      githubApiBudget: {
        title: 'GitHub API Budget',
        description: 'Rate limit budget for GitHub API calls.'
      },
      orcaAttribution: {
        title: 'Orca Attribution',
        description: 'Add Orca attribution to commits.',
        label: 'Orca Attribution',
        helper: 'Configure Orca Attribution settings.'
      }
    },
    mcp: {
      sshNotConnected: 'Ssh Not Connected',
      pathUnavailableHost: 'Path Unavailable Host',
      pathUnavailableDisk: 'Path Unavailable Disk',
      readError: 'Read Error',
      inspectError: 'Inspect Error',
      created: 'Created',
      createError: 'Create Error',
      title: 'MCP Servers',
      description: 'Model Context Protocol server configuration.',
      sshNote: 'Ssh Note',
      refreshAria: 'Refresh Aria',
      createEmpty: 'Create Empty',
      addConfig: 'Add Config',
      noConfig: 'No Config',
      checked: 'Checked'
    },
    mobile: {
      networkRefreshError: 'Network Refresh Error',
      wsNotRunning: 'Ws Not Running',
      qrGenError: 'Qr Gen Error',
      copyError: 'Copy Error',
      deviceRevoked: 'Device Revoked',
      revokeError: 'Revoke Error',
      qrAlt: 'Qr Alt',
      qrHint: 'Qr Hint',
      pasteHint: 'Paste Hint',
      pairedDevices: 'Paired Devices',
      noDevicesQr: 'No Devices Qr',
      noDevices: 'No Devices',
      pairedAt: 'Paired At',
      revokeHint: 'Revoke Hint',
      autoRestoreTitle: 'Auto Restore Title',
      autoRestoreDescription: 'Auto Restore Description',
      qrDialogTitle: 'Qr Dialog Title'
    },
    sparsePresets: {
      title: 'Sparse Checkout Presets',
      description: 'Manage saved directory sets for sparse worktree creation.',
      loading: 'Loading sparse presets...',
      empty: 'No sparse presets saved for this repository.',
      newPresetButton: 'New Preset',
      newPresetTitle: 'New Preset',
      editPresetTitle: 'Edit Preset',
      editorDescription:
        'Saved directories are used when creating sparse worktrees for this repository.',
      cancelEditAriaLabel: 'Cancel preset edit',
      nameLabel: 'Name',
      namePlaceholder: 'e.g. web-only',
      nameRequired: 'Name is required.',
      nameTooLong: 'Name must be 80 characters or fewer.',
      nameExists: '"{{name}}" already exists.',
      directoriesLabel: 'Directories',
      directoriesPlaceholder: 'packages/web\nshared/ui',
      directoryWillBeSaved: '1 directory will be saved.',
      directoriesWillBeSaved: '{{count}} directories will be saved.',
      directoriesHint: 'Use repo-relative paths like packages/web or apps/api.',
      savePreset: 'Save Preset',
      directoryCountSingular: '1 directory',
      directoryCountPlural: '{{count}} directories',
      updatedAt: 'Updated {{date}}',
      updatedDateUnknown: 'Updated date unknown',
      editAriaLabel: 'Edit {{name}}',
      deleteAriaLabel: 'Delete {{name}}',
      moreDirectories: '+{{count}} more'
    },
    mobileNetwork: {
      title: 'Network Interface',
      description:
        'Choose which network address to advertise in the QR code. Use your LAN address for same-network pairing, or an overlay network address (Tailscale, ZeroTier) for cross-network access.',
      noInterfaces: 'No interfaces found',
      refreshAriaLabel: 'Refresh network interfaces',
      refreshTooltip: 'Refresh network interfaces',
      generateQr: 'Generate QR Code',
      regenerateQr: 'Regenerate',
      tailnetAccordionTitle: 'Connect outside your Wi-Fi with a tailnet',
      tailnetDescription:
        'Orca Mobile connects directly to this computer. To use it away from the same local network, put your computer and phone on the same private overlay network, then generate the QR code with that network address selected.',
      tailnetStep1Prefix: 'Install',
      tailnetStep1Suffix: 'on your computer and phone.',
      tailnetStep2: 'Sign in to the same tailnet on both devices.',
      tailnetStep3:
        'In this Network Interface menu, choose the Tailscale address, usually a 100.x.y.z IP.',
      tailnetStep4: 'Regenerate the QR code and scan it from the Orca mobile app.'
    },
    privacy: {
      shareAnonymousData: 'Share Anonymous Data',
      shareAnonymousDataDescription: 'Share Anonymous Data Description',
      privacyPolicy: 'Privacy Policy',
      blocked: {
        ci: 'Ci',
        env: 'Env'
      }
    },
    repository: {
      identity: 'Identity',
      identityDescription: 'Identity Description',
      type: 'Type',
      openedAsFolder: 'Opened As Folder',
      removeRepo: 'Remove Repo',
      removeRepoDescription: 'Remove Repo Description',
      confirmRemove: 'Confirm Remove',
      displayName: 'Display Name',
      badgeColor: 'Badge Color',
      badgeColorDescription: 'Badge Color Description',
      defaultWorktreeBase: 'Default Worktree Base',
      defaultWorktreeBaseDescription: 'Default Worktree Base Description'
    },
    tasks: {
      taskSources: {
        title: 'Task Sources',
        description: 'Sources to pull tasks from.'
      },
      taskProviders: {
        title: 'Task Providers',
        description: 'Task provider integrations.'
      }
    },
    voice: {
      microphoneGranted: 'Microphone Granted',
      openedSystemSettings: 'Opened System Settings',
      micRequired: 'Mic Required',
      micRequestFailed: 'Mic Request Failed',
      enableDictation: 'Enable Dictation',
      enableDictationDescription: 'Enable Dictation Description',
      dictationMode: 'Dictation Mode',
      dictationModeDescription: 'Dictation Mode Description',
      toggle: 'Toggle',
      hold: 'Hold',
      speechModel: 'Speech Model',
      selectModelDescription: 'Select Model Description',
      selectModel: 'Select Model',
      downloadFailed: 'Download Failed',
      streaming: 'Streaming',
      offline: 'Offline',
      extracting: 'Extracting',
      deleteFailed: 'Delete Failed'
    },
    ssh: {
      targetsTitle: 'Targets',
      targetsDescription: 'Add a remote host to connect to it in Orca.',
      import: 'Import',
      addTarget: 'Add Target',
      noTargetsConfigured: 'No SSH targets configured.',
      editTargetTitle: 'Edit SSH Target',
      newTargetTitle: 'New SSH Target',
      label: 'Ssh',
      labelPlaceholder: 'My Server',
      host: 'Host',
      hostPlaceholder: '192.168.1.100 or server.example.com',
      username: 'Username',
      usernamePlaceholder: 'deploy',
      port: 'Port',
      portPlaceholder: '22',
      identityFile: 'Identity File',
      identityFilePlaceholder: '~/.ssh/id_ed25519 (leave empty for SSH agent)',
      identityFileDescription: 'Optional. SSH agent is used by default.',
      proxyCommand: 'Proxy Command',
      proxyCommandPlaceholder: 'e.g. cloudflared access ssh --hostname %h',
      proxyCommandDescription:
        'Optional. Used for tunneling (e.g. Cloudflare Access, ProxyCommand).',
      jumpHost: 'Jump Host',
      jumpHostPlaceholder: 'bastion.example.com',
      jumpHostDescription: 'Optional. Equivalent to ProxyJump / ssh -J.',
      relayGracePeriod: 'Relay Grace Period (seconds)',
      relayGracePeriodDescription:
        'How long the relay keeps terminals alive after disconnect. Default: 10800 (3 hours). 0 keeps it alive until terminals are ended or the relay is reset.',
      syncRemoteWorkspace: 'Sync remote workspace',
      syncRemoteWorkspaceDescription:
        'Store terminal tabs and split layouts on the SSH host so another Orca client can restore the same remote workspace.',
      syncedRelayGracePeriod: 'Synced Relay Grace Period (seconds)',
      syncedRelayGracePeriodDescription:
        'How long synced remote workspace terminals stay alive after all clients disconnect. 0 keeps them alive until explicitly terminated.',
      saveChanges: 'Save Changes',
      connect: 'Connect',
      disconnect: 'Disconnect',
      edit: 'Edit',
      remove: 'Remove',
      test: 'Test',
      connecting: 'Connecting',
      endRemoteTerminals: 'End remote terminals',
      resetRemoteRelay: 'Reset remote relay',
      dialog: {
        removeTitle: 'Remove SSH Target',
        removeDescription: 'This will remove the target and end any active remote terminals.',
        removeAction: 'Remove',
        removeBusy: 'Removing',
        resetTitle: 'Reset Remote Relay?',
        resetDescription:
          'This force-stops the remote relay for this SSH target. Active remote terminals and port forwards for this target will end.',
        resetAction: 'Reset Relay',
        resetBusy: 'Resetting',
        terminateTitle: 'End Remote Terminals?',
        terminateDescription:
          'This will stop active terminal sessions on this SSH target. Reconnecting will not restore them.',
        terminateAction: 'End Terminals',
        terminateBusy: 'Ending'
      },
      status: {
        disconnected: 'Disconnected',
        connecting: 'Connecting…',
        authFailed: 'Auth failed',
        deployingRelay: 'Deploying relay…',
        connected: 'Connected',
        reconnecting: 'Reconnecting…',
        reconnectionFailed: 'Reconnection failed',
        error: 'Error'
      },
      toast: {
        loadFailed: 'Failed to load SSH targets',
        hostAndUsernameRequired: 'Host and username are required',
        portInvalid: 'Port must be between 1 and 65535',
        relayGracePeriodInvalid: 'Relay grace period must be 0 or between 60 and 10800 seconds',
        syncedRelayGracePeriodInvalid:
          'Synced relay grace period must be between 0 and 10800 seconds',
        targetUpdated: 'Target updated',
        targetAdded: 'Target added',
        saveFailed: 'Failed to save target',
        targetRemoved: 'Target removed',
        removeFailed: 'Failed to remove target',
        connectionFailed: 'Connection failed',
        disconnectFailed: 'Disconnect failed',
        remoteTerminalsEnded: 'Remote terminals ended',
        endRemoteTerminalsFailed: 'Failed to end remote terminals',
        remoteRelayReset: 'Remote relay reset',
        resetRelayFailed: 'Failed to reset remote relay',
        connectionSuccessful: 'Connection successful',
        connectionTestFailed: 'Connection test failed',
        testFailed: 'Test failed',
        noNewHosts: 'No new hosts found in ~/.ssh/config',
        importedHost: 'Imported {{count}} host',
        importedHosts: 'Imported {{count}} hosts',
        importFailed: 'Import failed'
      },
      aria: {
        endingRemoteTerminals: 'Ending remote terminals',
        endRemoteTerminals: 'End remote terminals',
        resettingRemoteRelay: 'Resetting remote relay',
        resetRemoteRelay: 'Reset remote relay',
        editTarget: 'Edit target',
        removingTarget: 'Removing target',
        removeTarget: 'Remove target'
      }
    },
    accounts: {
      systemDefault: 'System default',
      active: 'Active',
      addAccount: 'Add Account',
      accountsLabel: 'Accounts',
      reauthenticate: 'Re-authenticate',
      remove: 'Remove',
      removeAccount: 'Remove Account',
      claude: {
        title: 'Claude Accounts',
        description: 'Optional account switcher for the shared Claude auth files.',
        headerDescription:
          'Optional. Orca can use your normal Claude login; add accounts only if you want quick switching without moving chat sessions.',
        accountDescription:
          'Orca swaps Claude auth only; config and chat history stay in the shared Claude root.',
        systemDefaultDescription: 'Use your current system Claude login.',
        noAccounts:
          'No managed Claude accounts yet. Orca will use your system default Claude login until you add one here.',
        removeDialog: {
          title: 'Remove Claude Account?',
          description:
            'Orca will delete the managed Claude auth for this saved account. If it is currently active, Orca falls back to the system default Claude login.'
        }
      },
      codex: {
        title: 'Codex Accounts',
        description: 'Manage which Codex account Orca uses for live rate limit fetching.',
        headerDescription1:
          'Optional. Orca can use your normal Codex login; add accounts only if you want quick switching in Orca.',
        headerDescription2:
          'Each account keeps its own local sign-in context in Orca. Account auth stays on this device.',
        accountDescription: 'Add a Codex account to use it in Orca.',
        systemDefaultDescription: 'Use your current system Codex login.',
        noAccounts:
          'No managed Codex accounts yet. Orca will use your system default Codex login until you add one here.',
        removeDialog: {
          title: 'Remove Codex Account?',
          description:
            'Orca will delete the managed Codex home for this saved account. If it is currently active, Orca falls back to the system default Codex login.'
        }
      },
      gemini: {
        headerDescription: 'Configure Gemini provider settings.',
        useCliCredentials: {
          title: 'Use Gemini CLI credentials',
          description:
            'Extracts OAuth credentials from your local Gemini CLI installation to authenticate with Google. This uses credentials issued to the Gemini CLI app, not Orca. May break if Google updates the CLI. Use at your own risk.',
          label: 'Use Gemini CLI credentials (experimental)',
          helperText:
            'Extracts OAuth credentials from your local Gemini CLI installation to authenticate with Google. This uses credentials issued to the Gemini CLI app, not Orca. May break if Google updates the CLI. Use at your own risk.'
        }
      },
      opencodeGo: {
        headerDescription: 'Configure OpenCode Go provider settings.',
        sessionCookie: {
          title: 'OpenCode Go Session Cookie',
          description: 'Paste your opencode.ai session cookie for rate limit fetching.',
          label: 'OpenCode Go session cookie',
          placeholder: 'Fe26.2**… token or auth=Fe26.2**… header',
          helperText:
            "Paste either the raw token value (e.g. {{tokenExample}}) or the full cookie header (e.g. {{headerExample}}). Find it in your browser's DevTools → Network → any opencode.ai request → Cookie header.",
          clear: 'Clear'
        },
        workspaceId: {
          title: 'OpenCode Go Workspace ID',
          description: 'Optional workspace ID override if the automatic lookup fails.',
          label: 'Workspace ID override',
          placeholder: 'wrk_…  (leave blank for automatic lookup)',
          helperText: 'Find this in the URL after logging into opencode.ai (e.g. {{exampleUrl}}).',
          clear: 'Clear'
        }
      },
      toasts: {
        loadCodexAccountsError: 'Could not load Codex accounts.',
        loadClaudeAccountsError: 'Could not load Claude accounts.',
        codexUpdateError: 'Codex account update failed.',
        claudeUpdateSuccess: 'Claude account updated.',
        claudeUpdateSuccessDescription:
          '{{previous}} → {{next}}. Restart live Claude terminals before continuing old sessions.',
        claudeUpdateError: 'Claude account update failed.'
      },
      errors: {
        codexSignInTimeout: 'Codex sign-in took too long to finish. Please try again.',
        codexSignInUnavailable:
          'Codex sign-in is temporarily unavailable. Please try again in a minute.',
        codexSignInFailed: 'Codex sign-in failed. Please try again.',
        claudeSignInFailed: 'Claude sign-in failed. Please try again.'
      }
    },
    runtimeEnvironments: {
      activeServer: {
        title: 'Active Server',
        description:
          'Choose local desktop, add a saved remote Orca server, or generate a pairing URL.',
        label: 'Active Server',
        localDescription:
          "Local keeps today's desktop behavior. Saved servers route supported client calls through the remote runtime.",
        webDescription: 'Saved servers route this browser through a paired Orca runtime.'
      },
      localDesktop: 'Local desktop',
      noServerConnected: 'No server connected',
      refreshServers: 'Refresh servers',
      savedServers: 'Saved Servers',
      addServer: 'Add Server',
      serverName: 'Server name',
      serverNamePlaceholder: 'Dev box',
      pairingCode: 'Pairing code',
      pairingCodePlaceholder: 'orca://pair#...',
      pairingCodeHelp1: 'Run',
      pairingCodeHelp2: 'on the server and paste the printed pairing URL.',
      noSavedServers: 'No saved servers.',
      noEndpoint: 'No endpoint',
      removeServerAriaLabel: 'Remove {{name}}',
      shareServer: {
        title: 'Share this Orca server',
        description:
          'Create a revocable access grant so a browser or another Orca client can connect.',
        hideForm: 'Hide Form',
        newLink: 'New Link'
      },
      switchServer: {
        title: 'Switch Server',
        description:
          'Orca will close remote terminals and browser tabs from the current server before loading projects from the next server.',
        switchTo: 'Switch to',
        switch: 'Switch'
      },
      removeServer: {
        title: 'Remove Server',
        activeLocalDescription:
          'Removing the active server first switches Orca back to Local desktop and closes remote terminals and browser tabs for that server.',
        activeWebDescription:
          'Removing the active server disconnects this browser and closes remote terminals and browser tabs for that server.',
        inactiveDescription:
          'This removes the saved server from Orca. It does not change the active server.',
        remove: 'Remove'
      },
      toasts: {
        loadError: 'Failed to load runtime environments.',
        nameAndCodeRequired: 'Name and pairing code are required.',
        duplicateName: 'A server named "{{name}}" already exists.',
        connectedTo: 'Connected to {{name}}.',
        saved: 'Saved {{name}}. Use Active Server to switch when ready.',
        saveError: 'Failed to save runtime environment.',
        switchToLocalError: 'Could not switch to Local desktop. Fix the issue and try again.',
        disconnectError: 'Could not disconnect from this server. Fix the issue and try again.',
        removed: 'Removed {{name}}.',
        removeError: 'Failed to remove runtime environment.',
        switchServersError: 'Could not switch servers. Fix the issue and try again.',
        switchError: 'Failed to switch servers.',
        switchedTo: 'Switched to {{name}}.'
      },
      errors: {
        switchServers: 'Could not switch servers. Fix the issue and try again.',
        switchFailed: 'Failed to switch servers.'
      },
      remoteServerFallback: 'remote server'
    },
    cli: {
      title: 'Orca CLI',
      description:
        'Use Orca from your terminal to open the app, manage worktrees, and interact with Orca terminals.',
      revealLabelDarwin: 'Show in Finder',
      revealLabelWin32: 'Show in Explorer',
      revealLabelDefault: 'Show in File Manager',
      installDescriptionDarwin: 'Register `orca` in /usr/local/bin.',
      installDescriptionLinux: 'Register `orca` in ~/.local/bin.',
      installDescriptionWin32: 'Register `orca` in your user PATH.',
      installDescriptionUnsupported: 'CLI registration is not yet available on this platform.',
      shellCommandLabel: 'Shell command',
      checkingStatus: 'Checking CLI registration…',
      refreshAriaLabel: 'Refresh CLI status',
      refreshTooltip: 'Refresh',
      commandPathLabel: 'Command path:',
      existingLauncherTarget: 'Existing launcher target:',
      pathNotVisible: '{{path}} is not currently visible on PATH for this shell.',
      agentSkillsLabel: 'Agent skills',
      agentSkillsDescription: 'Install skills so agents know how to use Orca and report status.',
      cliSkillLabel: 'CLI skill',
      copySkillInstallCommandAriaLabel: 'Copy CLI skill install command',
      copyTooltip: 'Copy',
      toast: {
        loadStatusFailed: 'Failed to load CLI status.',
        registered: 'Registered `orca` in PATH.',
        registerFailed: 'Failed to register `orca` in PATH.',
        removed: 'Removed `orca` from PATH.',
        removeFailed: 'Failed to remove `orca` from PATH.',
        copySkillCommandSuccess: 'Copied skill install command.',
        copySkillCommandFailed: 'Failed to copy install command.'
      },
      dialog: {
        removeTitle: 'Remove `orca` from PATH?',
        registerTitle: 'Register `orca` in PATH?',
        removeDescription: 'This removes the shell command symlink. Orca itself remains installed.',
        registerDescription:
          'Orca will register {{commandPath}} so the command works from your terminal.',
        targetPathLabel: 'Target path:',
        removing: 'Removing…',
        registering: 'Registering…',
        remove: 'Remove',
        register: 'Register'
      }
    },
    sessions: {
      title: 'Manage Sessions',
      description:
        'Recover from a frozen or misbehaving terminal by killing sessions or restarting the underlying daemon.',
      remoteUnavailableDescription:
        'Session management is unavailable while a remote runtime server is active.',
      remoteUnavailableHint:
        'Switch back to the local runtime to restart or kill local daemon sessions.',
      sessionsLabel: 'Sessions',
      refreshAriaLabel: 'Refresh',
      killAllAriaLabel: 'Kill all sessions',
      killAllTooltip: 'Kill all sessions',
      restartDaemonAriaLabel: 'Restart daemon',
      restartDaemonTooltip: 'Restart daemon',
      loading: 'Loading…',
      noSessions: 'No sessions.',
      goToTerminal: 'Go to terminal {{workspace}}',
      killSessionAriaLabel: 'Kill session {{sessionId}}',
      state: {
        unknown: 'unknown',
        exited: 'exited',
        running: 'running',
        starting: 'starting'
      },
      confirmDialog: {
        title: 'Kill this session?',
        descriptionPrefix: 'Force-quits',
        descriptionSuffix: ". Any unsaved work in that pane is lost. This can't be undone.",
        confirmLabel: 'Kill session',
        busyLabel: 'Killing…'
      },
      toast: {
        loadFailed: "Couldn't load sessions.",
        killed: 'Killed session.',
        killFailedGone: "Couldn't kill session — it may already be gone.",
        killFailed: "Couldn't kill session."
      }
    },
    repoHooks: {
      title: 'Worktree Hooks',
      description:
        'Configure shared repo hooks from `orca.yaml` and personal commands stored locally on this machine.',
      yamlHooksTitle: 'orca.yaml hooks',
      yamlHooksDescription:
        'Shared setup, archive, and issue automation commands for this repository.',
      yamlState: {
        loadedHeading: 'Using `orca.yaml`',
        loadedDescription:
          'Shared hook and issue-automation defaults are defined in the repo and available to everyone who uses it.',
        updateAvailableHeading: '`orca.yaml` could not be parsed',
        updateAvailableDescription:
          'The file contains configuration keys that this version of Orca does not recognize. You may need to update Orca, or check the file for typos.',
        invalidHeading: '`orca.yaml` could not be parsed',
        invalidDescription:
          'The core configuration file exists in the repo root, but Orca could not parse the supported hook definitions yet.',
        missingHeading: 'No `orca.yaml` detected',
        missingDescription:
          'Add an `orca.yaml` file to enable shared setup, archive, or issue-automation defaults for this repo. Example template:'
      },
      editYamlHint:
        'Edit `orca.yaml` in the repository if you need to change these shared commands.',
      invalidCardDescription:
        'The file is present, but Orca could not find valid `scripts` or `issueCommand` definitions in the expected format.',
      recommendedFixes: 'Recommended fixes',
      parseErrorFix1:
        'Check the indentation under `scripts:`. Hook keys should use two spaces, and command lines should use four.',
      parseErrorFix2:
        'Define only the supported keys: `scripts`, `setup`, `archive`, and `issueCommand`.',
      parseErrorFix3:
        'Compare your file against the working template below and copy that shape if needed.',
      exampleTemplatePrefix: 'Example',
      exampleTemplateSuffix: 'template',
      copiedButton: 'Copied',
      copyButton: 'Copy',
      localCommandsTitle: 'Local Settings Commands',
      localCommandsDescription:
        'Personal setup and archive commands stored locally on this machine.',
      localCommandsHeaderTitle: 'Local Settings Commands',
      localCommandsHeaderDescription:
        'Stored in Orca on this machine. These commands are not committed to the repository.',
      clearLocal: 'Clear Local',
      localSetupCommandLabel: 'Local setup command',
      localSetupCommandDescription:
        'Runs after a new workspace is created when the source policy includes local.',
      localArchiveCommandLabel: 'Local archive command',
      localArchiveCommandDescription: 'Runs before a local worktree is archived or removed.',
      addCommand: 'Add Command',
      noLocalCommands: 'No local {{hookName}} commands configured.',
      commandPlaceholder: 'Command',
      removeCommandAriaLabel: 'Remove {{label}} {{index}}',
      commandSourceTitle: 'Command Source',
      commandSourceDescription:
        'Choose whether Orca runs commands from `orca.yaml`, local Settings, or both.',
      commandSourceHeaderTitle: 'Command Source',
      commandSourceHeaderDescription:
        'Choose whether Orca runs commands from `orca.yaml`, local Settings, or both.',
      whenToRunSetupTitle: 'When to Run Setup',
      whenToRunSetupDescription: 'Choose the default behavior when a setup command is available.',
      whenToRunSetupHeaderTitle: 'When to Run Setup',
      whenToRunSetupHeaderDescription:
        'Choose the default behavior when a setup command is available.',
      setupRunPolicy: {
        askLabel: 'Ask every time',
        askDescription: 'Prompt before running setup.',
        runByDefaultLabel: 'Run by default',
        runByDefaultDescription: 'Run setup automatically.',
        skipByDefaultLabel: 'Skip by default',
        skipByDefaultDescription: 'Only run setup when chosen.'
      },
      commandSourcePolicy: {
        sharedOnlyLabel: 'Use orca.yaml only',
        sharedOnlyDescription: 'Run only committed repo commands; ignore local Settings commands.',
        localOnlyLabel: 'Use local only',
        localOnlyDescription: 'Ignore repo commands and run only your local Settings commands.',
        runBothLabel: 'Run both',
        runBothDescription: 'Run orca.yaml first, then your local Settings command.'
      },
      customIssueCommandTitle: 'Custom GitHub Issue Command',
      customIssueCommandDescription: 'Optional per-user override for the linked-issue command.',
      customIssueCommandHeaderTitle: 'Custom GitHub Issue Command',
      issueCommandPlaceholder: 'Complete {{artifact_url}}',
      issueCommandHelper1Prefix: 'Use',
      issueCommandHelper1Middle: 'for the linked issue or PR URL. Leave empty to use the built-in',
      issueCommandHelper1Suffix: 'default.',
      issueCommandHelper2Prefix: 'Leave blank to use the repo default from',
      issueCommandHelper2SuffixShared: '.',
      issueCommandHelper2SuffixMissing: ' when one exists.',
      toast: {
        saveIssueCommandFailed: 'Failed to save GitHub issue command.'
      }
    },
    runtimePairing: {
      toast: {
        unavailable: 'Pairing URL generation is currently unavailable.',
        generatedWebClient: 'Generated web client URL.',
        generatedPairing: 'Generated pairing URL.',
        generateFailed: 'Failed to generate pairing URL.',
        alreadyRevoked: 'This access grant has already been revoked.',
        revoked: 'Access grant revoked.',
        revokeFailed: 'Failed to revoke access grant.',
        copiedWebClient: 'Copied web client URL.',
        copiedPairing: 'Copied pairing URL.',
        copyFailed: 'Failed to copy URL.',
        refreshFailed: 'Failed to refresh network interfaces.',
        loadGrantsFailed: 'Failed to load shared access grants.'
      },
      title: 'Share this Orca server',
      description: 'Create a revocable access grant for browser or desktop clients.',
      connectionAddress: 'Connection address',
      thisComputer: 'This computer ({{address}})',
      customAddress: 'Custom address',
      customAddressPlaceholder: 'host, host:port, or wss://host/path',
      addressHint:
        '127.0.0.1 only works on this computer. Use a LAN, Tailscale, or custom address for another device.',
      generateAccessLink: 'Generate Access Link',
      openInBrowser: 'Open in browser',
      browserUrlDescription: 'Use this URL from a browser that can reach the selected address.',
      browserUrlUnavailable:
        'Browser link unavailable in this build. The pairing URL still works for Orca clients.',
      pairAnotherClient: 'Pair another Orca client',
      pairingUrlDescription: 'Paste this pairing URL into another Orca client.',
      refreshAddresses: 'Refresh connection addresses',
      copyAria: 'Copy {{label}}'
    }
  },
  sidebar: {
    nav: {
      tasks: 'Tasks',
      automations: 'Automations',
      agents: 'Agents',
      search: 'Search',
      searchAriaLabel: 'Search worktrees and browser tabs',
      searchShortcut: 'Ctrl+Shift+J',
      openGitHubTasks: 'Open GitHub tasks',
      openGitLabTasks: 'Open GitLab tasks',
      openLinearTasks: 'Open Linear tasks'
    },
    filter: {
      filterWorkspaces: 'Filter workspaces',
      editFilters: 'Edit filters',
      editFiltersActive: 'Edit filters ({{count}} active)',
      activeOnly: 'Active only',
      hideDefaultBranch: 'Hide default branch',
      repositories: 'Repositories',
      selectAll: 'Select all',
      clear: 'Clear',
      searchReposPlaceholder: 'Search repos...',
      noReposMatch: 'No repos match',
      ssh: 'SSH',
      resetFilters: 'Reset filters',
      addRepo: 'Add repo'
    },
    openIn: {
      openIn: 'Open in',
      pathNotAbsolute: 'Workspace path is not a valid local path.',
      folderNotFound: 'Workspace folder was not found.',
      folderNotFoundDescription:
        'It may have been moved or deleted. Refresh workspaces or remove it from Orca.',
      openFailed: 'Could not open workspace folder.',
      openFailedDescription:
        'Check the editor command or file manager configuration on this machine.'
    },
    remoteFileBrowser: {
      placeholder: 'Type to filter or enter a path…',
      emptyDirectory: 'Empty directory',
      emptyPreview: '{{path}} is empty',
      noMatches: "No matches for '{{filter}}'",
      fileHint: "Files can't be opened as a project",
      footer: 'Opens as a remote project · {{path}}',
      selectFolder: 'Select folder'
    },
    deleteWorktree: {
      title: 'Delete Worktree',
      titleBatch: 'Delete Worktrees',
      description: 'Remove {{name}} from git and delete its working tree folder.',
      descriptionBatch:
        'Remove {{count}} worktrees from git and delete their working tree folders.',
      mainWorktreeWarning: 'The main worktree cannot be deleted. Remove the repository instead.',
      dontAskAgain: "Don't ask again",
      forceDelete: 'Force Delete',
      forceDeleting: 'Force Deleting…',
      deleting: 'Deleting…',
      cancel: 'Cancel',
      dontAskAgainToast: "We'll skip this confirmation next time.",
      dontAskAgainDescription: 'You can change this in Settings.',
      openSettings: 'Open Settings',
      forceDeleteFailed: 'Force delete failed',
      deleteFailed: 'Failed to delete worktree'
    },
    removeFolder: {
      title: 'Remove Project',
      description: 'This only removes {{name}} from Orca. It is still on your disk.',
      cancel: 'Cancel',
      remove: 'Remove'
    },
    nonGitFolder: {
      title: 'Open as Folder',
      description:
        "This folder isn't a Git repository. You'll have the editor, terminal, and search, but Git-based features won't be available.",
      cancel: 'Cancel',
      open: 'Open as Folder',
      addFailed: 'Failed to add remote folder'
    },
    orcaYamlTrust: {
      changedTitle: "{{repoName}}'s {{scriptKind}} changed — run the new version?",
      newTitle: 'Run {{scriptKind}} from {{repoName}}?',
      changedDescription:
        'orca.yaml changed since you last approved. Re-review before it runs {{trigger}}.',
      newDescription:
        "This repository's orca.yaml runs on your machine {{trigger}}. Only run if you trust {{repoName}}.",
      scriptLabels: {
        setup: 'setup script',
        archive: 'archive script',
        issueCommand: 'issue command'
      },
      triggers: {
        setup: 'when this workspace is created',
        archive: 'when this workspace is removed',
        issueCommand: 'when this workspace launches with a linked issue'
      },
      alwaysTrust: 'Always trust orca.yaml in {{repoName}}',
      dontRun: "Don't run",
      runHooks: 'Run hooks',
      newScript: 'New {{scriptKind}} script',
      script: '{{scriptKind}} script'
    },
    sshDisconnected: {
      titleReconnecting: 'Reconnecting…',
      titleDisconnected: 'SSH Disconnected',
      statusMessages: {
        disconnected: 'This remote repository is not connected.',
        reconnecting: 'Reconnecting to the remote host...',
        reconnectionFailed: 'Reconnection to the remote host failed.',
        error: 'The connection to the remote host encountered an error.',
        authFailed: 'Authentication to the remote host failed.'
      },
      reconnectingMessage: 'Reconnecting to the remote host...',
      dismiss: 'Dismiss',
      reconnect: 'Reconnect',
      connecting: 'Connecting...',
      reconnectionFailed: 'Reconnection failed'
    },
    toolbar: {
      addProject: 'Add Project',
      addProjectTooltip: 'Open folder picker to add a project',
      toolboxAriaLabel: 'Toolbox',
      toolboxTooltip: 'Toolbox',
      orcaMobile: 'Orca Mobile',
      skills: 'Skills',
      spaceAnalyzer: 'Space Analyzer',
      helpAriaLabel: 'Help',
      helpTooltip: 'Help',
      showOnboarding: 'Show Onboarding',
      sendFeedback: 'Send feedback',
      docs: 'Docs',
      settingsTooltip: 'Settings',
      feedback: {
        title: 'Send Feedback',
        description: "Share what's working, what's broken, or what Orca should do next.",
        otherWays: 'Other ways to reach us',
        githubIssues: 'GitHub issues',
        joinDiscord: 'Join Discord',
        followOnX: 'Follow on X',
        placeholder: 'What could we improve?',
        githubLabel: 'GitHub:',
        submitAnonymously: 'Submit anonymously',
        checkingIdentity: 'Checking GitHub identity…',
        submitOnlyHint:
          'Submit with your typed feedback only, or connect `gh` to include GitHub identity.',
        send: 'Send',
        sending: 'Sending…',
        toast: {
          enterFeedback: 'Please enter feedback before submitting.',
          thanks: 'Thanks for the feedback.',
          submitFailed: 'Failed to submit feedback. Please try again.'
        }
      }
    },
    header: {
      workspaces: 'Workspaces',
      workspaceBoardAriaLabel: 'Workspace board',
      closeWorkspaceBoard: 'Close workspace board',
      workspaceBoard: 'Workspace board',
      viewOptionsAriaLabel: 'View options',
      viewOptionsTooltip: 'View options',
      groupBy: 'Group by',
      groupByOptions: {
        none: 'None',
        status: 'Status',
        pr: 'PR',
        repo: 'Repo'
      },
      sortBy: 'Sort by',
      sortByOptions: {
        name: 'Name',
        smart: 'Smart',
        recent: 'Recent',
        repo: 'Repo',
        smartDescription: 'Agents that need attention, then most recent activity.'
      },
      showProperties: 'Show properties',
      propertyOptions: {
        agentActivity: 'Agent activity'
      },
      newWorkspaceAriaLabel: 'New workspace',
      newWorkspaceTooltip: 'New workspace ({{shortcut}})',
      newWorkspaceDisabledTooltip: 'Add a Git project to create worktrees'
    },
    addRepo: {
      remote: {
        browseTitle: 'Browse remote filesystem',
        browseDescription: 'Navigate to a directory and click Select to choose it.',
        title: 'Open remote project',
        description: 'Choose a connected SSH target and enter the path to a Git repository.',
        sshTargetLabel: 'SSH target',
        noSshTargets: 'No SSH targets configured.',
        addInSettings: 'Add in Settings',
        remotePathLabel: 'Remote path',
        remotePathPlaceholder: '/home/user/project',
        adding: 'Adding...',
        addButton: 'Add remote project',
        connectionFailed: 'Connection failed',
        success: 'Remote project added'
      },
      clone: {
        title: 'Clone from URL',
        description: 'Enter the Git URL and choose where to clone it.',
        gitUrlLabel: 'Git URL',
        gitUrlPlaceholder: 'https://github.com/user/repo.git',
        cloneLocationLabel: 'Clone location',
        cloneLocationPlaceholder: '/path/to/destination',
        chooseFolder: 'Choose folder',
        enterServerPath: 'Enter a server path manually',
        cloning: 'Cloning...',
        cloneButton: 'Clone'
      }
    },
    worktreeCard: {
      deleting: 'Deleting…',
      markRead: 'Mark read',
      markUnread: 'Mark unread',
      markAsRead: 'Mark as read',
      markAsUnread: 'Mark as unread',
      sshDisconnected: 'SSH disconnected',
      sshRemote: 'Remote repository via SSH',
      unreadPrefix: 'Unread: ',
      primaryBadge: 'primary',
      primaryTooltip: 'Primary worktree (original clone directory)',
      sparseBadge: 'sparse',
      sparseTooltip: 'Partial checkout. Files outside these paths are not on disk.',
      sparseMore: '+{{count}} more',
      issueDetailsUnavailable: 'Issue details unavailable',
      loadingIssue: 'Loading issue...',
      linearIssueDetailsUnavailable: 'Linear issue details unavailable',
      loadingLinearIssue: 'Loading Linear issue...',
      folderBadge: 'Folder',
      missingParent: 'Missing parent',
      fromParent: 'from {{parent}}',
      remoteBranchConflict: '{{remote}}/{{branchName}} already exists.',
      childWorkspaceSingular: '{{count}} child workspace',
      childWorkspacePlural: '{{count}} child workspaces',
      childShortSingular: '{{count}} child',
      childShortPlural: '{{count}} children',
      show: 'Show',
      hide: 'Hide',
      showChildWorkspaces: 'Show child workspaces',
      hideChildWorkspaces: 'Hide child workspaces'
    },
    contextMenu: {
      copyPath: 'Copy Path',
      pin: 'Pin',
      unpin: 'Unpin',
      markRead: 'Mark Read',
      markUnread: 'Mark Unread',
      openParentWorkspace: 'Open Parent Workspace',
      removeFromParent: 'Remove from Parent',
      moveStatusesTo: 'Move Statuses To',
      moveToStatus: 'Move to Status',
      update: 'Update',
      sleepTooltipSingle: 'Close all active panels in this workspace to free up memory and CPU.',
      sleepTooltipMulti:
        'Close all active panels in the selected workspaces to free up memory and CPU.',
      sleep: 'Sleep',
      sleepWorkspaceSingular: 'Sleep {{count}} Workspace',
      sleepWorkspacePlural: 'Sleep {{count}} Workspaces',
      deleteSelected: 'Delete Selected',
      deleteWorkspaceSingular: 'Delete {{count}} Workspace',
      deleteWorkspacePlural: 'Delete {{count}} Workspaces',
      mainWorktreeCannotDelete: 'The main worktree cannot be deleted',
      deleting: 'Deleting…',
      removeFolderFromOrca: 'Remove Folder from Orca',
      delete: 'Delete'
    }
  },
  browser: {
    homePage: {
      label: 'Home Page',
      description: 'Default home page for the built-in browser.',
      save: 'Save',
      placeholder: 'Placeholder'
    },
    searchEngine: {
      label: 'Search Engine',
      description: 'Default search engine for the built-in browser.'
    },
    linkRouting: {
      label: 'Link Routing',
      description: 'How to handle external link clicks.'
    },
    sessionCookies: {
      label: 'Session Cookies',
      description: 'How to manage session cookies.',
      addProfile: 'Add Profile',
      newProfileTitle: 'New Profile Title',
      profilePlaceholder: 'Profile Placeholder',
      creating: 'Creating',
      create: 'Create',
      profileCreated: 'Profile Created',
      profileCreateFailed: 'Profile Create Failed'
    }
  },
  notifications: {
    enable: 'Enable',
    enableDescription: 'Enable Description',
    agentTaskComplete: 'Agent Task Complete',
    agentTaskCompleteDescription: 'Agent Task Complete Description',
    terminalBell: 'Terminal Bell',
    terminalBellDescription: 'Terminal Bell Description',
    customSound: 'Custom Sound',
    customSoundDescription: 'Custom Sound Description',
    supportedFormats: 'Supported Formats',
    systemSound: 'System Sound',
    change: 'Change',
    choose: 'Choose',
    clear: 'Clear',
    suppressWhileFocused: 'Suppress While Focused',
    suppressWhileFocusedDescription: 'Suppress While Focused Description',
    sendTest: 'Send Test',
    testSent: 'Test Sent',
    customSoundPlayFailed: 'Custom Sound Play Failed'
  },
  automations: {
    toast: {
      chooseRunLocationAndPrompt: 'Choose a run location and enter a prompt.',
      pickSupportedSchedule: 'Pick a supported schedule type.',
      enterValidCron: 'Enter a valid cron expression.',
      chooseAvailableWorkspace: 'Choose an available workspace.',
      chooseSameHostWorkspace: 'Choose a workspace on the same host.',
      hermesCronUpdated: 'Hermes cron updated.',
      hermesCronCreated: 'Hermes cron created.',
      automationUpdated: 'Automation updated.',
      automationSaved: 'Automation saved.',
      saveFailed: 'Failed to save automation.',
      skipConfirmationNextTime: "We'll skip this confirmation next time.",
      skipConfirmDescription: 'You can change this in Settings.',
      openSettings: 'Open Settings',
      runQueued: 'Run queued.',
      runSubmitted: 'Automation run submitted. ID: {{runId}} — view status in the Task page.',
      externalActionFailed: 'External action failed.',
      externalAutomationDeleted: 'External automation deleted.',
      externalAutomationQueued: 'External automation queued.',
      externalAutomationPaused: 'External automation paused.',
      externalAutomationResumed: 'External automation resumed.',
      sshUnavailable: 'SSH connection is unavailable.',
      sshConnected: 'SSH connected.',
      sshFailed: 'SSH connection failed.',
      workspaceUnavailable: 'Workspace is unavailable.'
    },
    title: 'Automations',
    closeAutomationsAria: 'Close automations',
    closeAutomationsTooltip: 'Close · Esc',
    addAutomationAria: 'Add automation',
    addAutomationTooltip: 'Add automation',
    refreshAutomationsAria: 'Refresh automations',
    refreshAutomationsTooltip: 'Refresh automations',
    automationHeader: 'Automation',
    nextHeader: 'Next',
    deleteAutomationTitle: 'Delete Automation',
    andItsRunHistory: 'and its run history. Workspaces created by previous runs are not deleted.',
    newWorkspaceEachRun: 'New workspace each run',
    selectedWorkspace: 'Selected workspace',
    dontAskAgain: "Don't ask again",
    deleteExternalAutomationTitle: 'Delete External Automation',
    from: 'from',
    externalSource: 'external source',
    on: 'on',
    connectToLoadJobs: 'Connect to load jobs',
    unavailable: 'Unavailable',
    sourceUnavailable: '{{provider}} source unavailable until {{targetKind}} connects.',
    unknownProject: 'Unknown project',
    missingWorkspace: 'Missing workspace',
    usageUnavailable: 'Usage unavailable',
    noRunUsageYet: 'No run usage yet',
    paused: 'Paused',
    createFromBranch: 'Create from {{branch}}',
    projectDefault: 'project default',
    usageText: '{{cost}} est. · {{tokens}} tokens',
    run_one: 'run',
    run_other: 'runs',
    manageable: 'Manageable',
    readOnly: 'Read-only',
    connectSsh: 'Connect SSH',
    connecting: 'Connecting...',
    overviewTab: 'Overview',
    runsTab: 'Runs',
    orca: 'Orca',
    noWorkspace: 'No workspace',
    latestSavedOutput: 'Latest saved output',
    selectAutomationToViewRuns: 'Select an automation to view runs.',
    startFromTemplate: 'Start from a template',
    addNew: 'Add new',
    runNow: 'Run Now',
    edit: 'Edit',
    pause: 'Pause',
    resume: 'Resume',
    unsupportedSchedule:
      'This automation has an unsupported saved schedule. Pick a supported schedule before saving changes.',
    unsupportedHermesSchedule:
      'This Hermes cron has an unsupported saved schedule. Pick a supported schedule before saving changes.',
    never: 'Never',
    statusCompleted: 'Completed',
    statusFailed: 'Failed',
    statusUnknown: 'Unknown',
    targetKindLocal: 'Local',
    targetKindRemoteSsh: 'Remote SSH',
    noOutputContent: 'No output content available.'
  },
  linear: {
    toast: {
      copied: '{{label}} copied',
      copyFailed: 'Failed to copy {{label}}',
      loadSubIssueFailed: 'Failed to load sub-issue',
      created: 'Created {{identifier}}',
      createSubIssueFailed: 'Failed to create sub-issue',
      loadProjectsFailed: 'Failed to load projects',
      projectUpdated: 'Project updated',
      updateProjectFailed: 'Failed to update project',
      loadCommentsFailed: 'Failed to load comments.'
    },
    copyLabels: {
      url: 'URL',
      identifier: 'Identifier',
      suggestedBranchName: 'Suggested branch name',
      prompt: 'Prompt'
    },
    subIssues: {
      addSubIssues: 'Add sub-issues',
      subIssueTitlePlaceholder: 'Sub-issue title',
      create: 'Create'
    },
    projectCard: {
      title: 'Project',
      addToProject: 'Add to project',
      searchPlaceholder: 'Search projects',
      loading: 'Loading projects',
      noProjectsFound: 'No projects found.',
      searchForProject: 'Search for a project to add.'
    },
    workspace: {
      fallbackTitle: 'Linear issue',
      sheetDescription: 'Preview, edit, and start work from the selected issue.',
      issues: 'Issues',
      copyUrlAria: 'Copy Linear URL',
      copyUrl: 'Copy URL',
      copyIdentifierAria: 'Copy issue identifier',
      copyIdentifier: 'Copy identifier',
      startWorkspaceAria: 'Start workspace from issue',
      startWorkspace: 'Start workspace',
      closePreviewAria: 'Close Linear issue preview',
      close: 'Close',
      noDescription: 'No description provided.',
      activity: 'Activity',
      someone: 'Someone',
      issueUpdated: '{{assignee}} updated the issue · {{time}}',
      retry: 'Retry',
      unknownUser: 'Unknown',
      actions: 'Actions',
      you: 'You'
    }
  },
  githubItem: {
    state: {
      merged: 'Merged',
      draft: 'Draft',
      closed: 'Closed',
      open: 'Open'
    },
    mergeTooltip: {
      notLoaded: 'Merge status has not loaded yet',
      alreadyMerged: 'This pull request is already merged',
      closed: 'This pull request is closed',
      conflicting: 'GitHub reports merge conflicts',
      behind: 'Update the branch before merging',
      blocked: 'GitHub reports this pull request is blocked',
      canMerge: 'GitHub says this PR can merge',
      unknown: 'GitHub has not reported a final merge status'
    },
    mention: {
      prAuthor: 'PR author',
      issueAuthor: 'Issue author',
      commenter: 'Commenter',
      participant: 'Participant',
      teamMember: 'Team member'
    },
    diff: {
      failedToLoad: 'Failed to load diff',
      binaryFile: 'Binary file — diff not shown.',
      unavailable: 'Diff unavailable (missing commit SHAs).'
    },
    codeContext: {
      showBlock: 'Show surrounding code block',
      showNearby: 'Show nearby code context',
      loading: 'Loading code context…'
    },
    reply: {
      inThread: 'Reply in this review thread',
      toAuthor: 'Reply to @{{author}}',
      posting: 'Posting…',
      reply: 'Reply',
      cancel: 'Cancel'
    },
    merge: {
      squashAndMerge: 'Squash and merge',
      rebaseAndMerge: 'Rebase and merge',
      merge: 'Merge',
      closePR: 'Close PR',
      reopenPR: 'Reopen PR',
      requiresRepo: 'Merge requires a registered local repo',
      openGitHubMergeBox: 'Open GitHub merge box',
      confirmTitle: '{{method}} PR #{{number}}?'
    },
    folder: {
      collapse: 'Collapse',
      expand: 'Expand'
    },
    viewed: {
      unmark: 'Unmark',
      mark: 'Mark',
      unmarkViewed: 'Unmark viewed',
      markViewed: 'Mark viewed',
      viewed: 'Viewed',
      markAsViewed: '{{action}} {{file}} as viewed'
    },
    sheet: {
      fallbackTitle: 'GitHub item',
      description: 'Read-only preview of the selected GitHub issue or pull request.',
      pullRequest: 'Pull request',
      issue: 'Issue',
      unknown: 'unknown',
      updated: 'updated',
      copyLink: 'Copy GitHub link',
      copied: 'Copied',
      openOnGitHub: 'Open on GitHub'
    },
    tabs: {
      conversation: 'Conversation',
      files: 'Files',
      checks: 'Checks'
    },
    startWorkspace: {
      fromPR: 'Start workspace from PR',
      fromIssue: 'Start workspace from issue'
    },
    errors: {
      noRepoForEdit: 'No repo context available for this edit.',
      noRepoForPR: 'No repo context available for this pull request.'
    },
    toast: {
      commentNoSha: 'Unable to comment without the PR head SHA.',
      reviewCommentAdded: 'Review comment added.',
      replyNoRepo: 'Unable to reply without a repository path.',
      replyPosted: 'Reply posted.',
      prClosed: 'Pull request closed',
      prReopened: 'Pull request reopened',
      prStateFailed: 'Failed to {{action}} PR',
      prMerged: 'Pull request merged',
      mergeFailed: 'Failed to merge pull request',
      checkRefreshFailed: 'Failed to refresh checks',
      checkRerunFailed: 'Failed to rerun checks',
      checkRerunRequested: 'Check rerun requested',
      checkRerunsRequested: 'Check reruns requested',
      viewedStateSyncFailed: 'Failed to sync viewed state with GitHub.',
      linkCopied: 'GitHub link copied',
      linkCopyFailed: 'Failed to copy GitHub link',
      commentFailed: 'Failed to add comment',
      replyFailed: 'Failed to post reply.'
    }
  },
  taskPage: {
    filter: {
      open: 'Open',
      merged: 'Merged',
      closed: 'Closed',
      all: 'All'
    },
    source: {
      github: 'GitHub',
      gitlab: 'GitLab',
      linear: 'Linear'
    },
    preset: {
      open: 'Open',
      assignedToMe: 'Assigned to me',
      mine: 'Mine',
      needsReview: 'Needs review',
      myIssues: 'My Issues',
      created: 'Created',
      completed: 'Completed',
      issues: 'Open',
      'my-issues': 'Assigned to me',
      prs: 'Open',
      'my-prs': 'Mine',
      review: 'Needs review',
      all: 'All',
      assigned: 'My Issues'
    },
    linearTab: {
      issues: 'Issues',
      projects: 'Projects'
    },
    priority: {
      none: 'None',
      urgent: 'Urgent',
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    },
    viewMode: {
      list: 'List',
      board: 'Board'
    },
    groupBy: {
      none: 'No grouping',
      status: 'Status',
      assignee: 'Assignee',
      priority: 'Priority',
      team: 'Team'
    },
    sortBy: {
      priority: 'Priority',
      updated: 'Updated',
      identifier: 'Identifier'
    },
    boardProperty: {
      state: 'Status',
      priority: 'Priority',
      assignee: 'Assignee',
      team: 'Team',
      labels: 'Labels',
      updated: 'Updated'
    },
    assignee: {
      unassigned: 'Unassigned'
    },
    review: {
      requested: 'Requested',
      reviewed: 'Reviewed',
      noReviewersYet: 'No reviewers requested yet.',
      openDetailsToView: 'Open the PR details to view current reviewers.',
      noMatchingReviewers: 'No matching reviewers.',
      reviewers: 'Reviewers',
      approved: 'Approved',
      changesRequested: 'Changes requested',
      requestedCount: '{{count}} requested',
      reviewedCount: '{{count}} reviewed',
      noReviewers: 'No reviewers'
    },
    checks: {
      checks: 'Checks',
      noChecks: 'No checks',
      failing: '{{count}} failing',
      pending: '{{count}} pending',
      passed: '{{passed}}/{{total}} passed',
      openPRConversationAndChecks: 'Open PR conversation and checks'
    },
    merge: {
      confirmTitle: '{{method}} PR #{{number}}?',
      conflicts: 'Conflicts',
      behind: 'Behind',
      blocked: 'Blocked',
      ableToMerge: 'Able to merge',
      unknown: 'Unknown',
      checksPending: 'GitHub says this PR can merge, but checks are still running',
      checksPassed: 'GitHub says this PR can merge and checks passed'
    },
    errors: {
      loadLinearIssues: 'Failed to load Linear issues.',
      connectionFailed: 'Connection failed'
    },
    search: {
      prs: 'Search GitHub PRs...',
      issues: 'Search GitHub issues...',
      linear: 'Search Linear issues...'
    },
    refresh: {
      gitlabWorkItems: 'Refresh GitLab work items',
      myTodos: 'Refresh My Todos'
    },
    retry: 'Retry',
    gitlab: {
      noPendingTodos: 'No pending todos. You’re all caught up!',
      selectRepoToAuth: 'Select a repo so we can authenticate to GitLab.',
      noMatches: 'No GitLab work matches this filter.',
      selectRepoToSee: 'Select a repo to see GitLab work items.',
      mr: 'MR',
      issue: 'Issue',
      createsNewIssueInSelectedTeam: 'Creates a new issue in the selected team.',
      createsNewIssueInTeam: 'Creates a new issue in {{workspace}}{{team}}.',
      yourTeam: 'your team'
    },
    header: {
      id: 'ID',
      titleContext: 'Title / Context',
      branch: 'Branch',
      status: 'Status',
      reviewers: 'Reviewers',
      checks: 'Checks',
      merge: 'Merge',
      updated: 'Updated',
      action: 'Action',
      title: 'Title',
      project: 'Project',
      typeState: 'Type / State',
      key: 'Key',
      issue: 'Issue',
      priority: 'Priority',
      assignee: 'Assignee',
      team: 'Team',
      linearIssues: 'Linear issues',
      shown: '{{count}} shown'
    },
    empty: {
      noMatchingGitHubWork: 'No matching GitHub work',
      changeQueryOrClear: 'Change the query or clear it.',
      noLinearIssuesFound: 'No Linear issues found',
      tryDifferentSearch: 'Try a different search query.',
      noAssignedIssues: 'No assigned issues. Try searching for something.',
      noIssuesMatchTeams: 'No issues match the selected teams',
      selectMoreTeams: 'Try selecting more teams or click "All teams".',
      noPendingTodos: 'No pending todos. You’re all caught up!',
      selectRepoForGitLab: 'Select a repo so we can authenticate to GitLab.',
      noGitLabWorkMatches: 'No GitLab work matches this filter.',
      selectRepoToSeeGitLab: 'Select a repo to see GitLab work items.'
    },
    label: {
      newGitHubIssue: 'New GitHub issue',
      newLinearIssue: 'New Linear issue',
      refreshGitHubWork: 'Refresh GitHub work',
      refreshLinearIssues: 'Refresh Linear issues',
      startWorkspace: 'Start workspace',
      openInBrowser: 'Open in browser',
      view: 'View',
      creating: 'Creating…',
      connect: 'Connect',
      verifying: 'Verifying…',
      cancel: 'Cancel',
      createIssue: 'Create issue',
      previous: 'Previous',
      next: 'Next',
      pagination: 'Pagination',
      previousPage: 'Previous page',
      nextPage: 'Next page',
      retry: 'Retry',
      retrying: 'Retrying…',
      linearViewMode: 'Linear view mode',
      grouping: 'Grouping',
      ordering: 'Ordering',
      displayProperties: 'Display properties',
      issues: 'Issues',
      prs: 'PRs',
      project: 'Projects',
      connectLinearWorkspace: 'Connect Linear workspace'
    },
    toast: {
      linearStateUpdateFailed: 'Failed to update Linear state',
      stateUpdateFailed: 'Failed to update state',
      reviewerRequired: 'Enter a reviewer login',
      reviewerRequested: 'Reviewer requested',
      reviewerRequestFailed: 'Failed to request reviewer',
      defaultTaskViewSaveFailed: 'Failed to save default task view.',
      createIssueFailed: 'Failed to create issue.',
      workspaceSwitchFailed: 'Failed to switch Linear workspace.',
      teamSelectionSaveFailed: 'Failed to save team selection.',
      repoSelectionSaveFailed: 'Failed to save repo selection.',
      loadGitHubWorkFailed: 'Failed to load GitHub work.',
      upstreamNotConfigured: 'Issues from {{slug}}',
      issueCreated: 'Opened issue #{{number}}',
      linearIssueCreated: 'Created {{identifier}}'
    }
  },
  blank: 'Blank',
  '/': '/'
} as const
