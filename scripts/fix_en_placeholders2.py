#!/usr/bin/env python3
"""Fix remaining placeholder values in en.ts with inferred English text."""

import re

def load_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def save_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def camel_to_title(s):
    """Convert camelCase/kebab to Title Case."""
    if not s:
        return ''
    # Handle special cases
    s = s.replace('Github', 'GitHub').replace('github', 'GitHub')
    s = s.replace('Gitlab', 'GitLab').replace('gitlab', 'GitLab')
    s = s.replace('Devops', 'DevOps').replace('devops', 'DevOps')
    s = s.replace('Api', 'API').replace('api', 'API')
    s = s.replace('Ai', 'AI').replace('ai', 'AI')
    s = s.replace('Orca', 'Orca')  # preserve
    s = s.replace('Cli', 'CLI').replace('cli', 'CLI')
    s = s.replace('Mcp', 'MCP').replace('mcp', 'MCP')
    s = s.replace('Url', 'URL').replace('url', 'URL')
    s = s.replace('Ssh', 'SSH').replace('ssh', 'SSH')

    result = []
    for i, char in enumerate(s):
        if i == 0:
            result.append(char.upper())
        elif char.isupper() and s[i-1].islower():
            result.append(' ')
            result.append(char)
        else:
            result.append(char)
    text = ''.join(result)
    # Fix some common replacements
    text = text.replace('Star Github', 'Star on GitHub')
    return text

def get_title_for_path(path):
    """Get a human-readable title for a given path."""
    # Specific overrides
    overrides = {
        'settings.general.workspace': 'Workspace',
        'settings.general.editor': 'Editor',
        'settings.general.updates': 'Updates',
        'settings.general.support': 'Support',
        'settings.appearance.theme': 'Theme',
        'settings.appearance.zoom': 'Zoom',
        'settings.appearance.typography': 'Typography',
        'settings.appearance.layout': 'Layout',
        'settings.appearance.titlebar': 'Title Bar',
        'settings.appearance.statusBar': 'Status Bar',
        'settings.appearance.sidebar': 'Sidebar',
        'settings.shortcuts.ctrlTabOrder': 'Ctrl+Tab Order',
        'settings.terminal.windowsShell': 'Windows Shell',
        'settings.terminal.floating': 'Floating Terminal',
        'settings.terminal.quickCommands': 'Quick Commands',
        'settings.terminal.typography': 'Typography',
        'settings.terminal.rendering': 'Rendering',
        'settings.terminal.cursor': 'Cursor',
        'settings.terminal.paneStyling': 'Pane Styling',
        'settings.terminal.setupScript': 'Setup Script',
        'settings.terminal.advanced': 'Advanced',
        'settings.commitMessageAi.enabled': 'Enabled',
        'settings.commitMessageAi.agent': 'Agent',
        'settings.commitMessageAi.customCommand': 'Custom Command',
        'settings.commitMessageAi.model': 'Model',
        'settings.commitMessageAi.thinking': 'Thinking',
        'settings.commitMessageAi.customPrompt': 'Custom Prompt',
        'settings.computerUse.installSkill': 'Install Skill',
        'settings.experimental.pet': 'Pet Mode',
        'settings.experimental.agentsView': 'Agents View',
        'settings.experimental.symlinks': 'Symlinks',
        'settings.git.branchPrefix': 'Branch Prefix',
        'settings.git.refreshLocalBaseRef': 'Refresh Local Base Ref',
        'settings.git.githubApiBudget': 'GitHub API Budget',
        'settings.git.orcaAttribution': 'Orca Attribution',
        'settings.mcp': 'MCP Servers',
        'settings.tasks.taskSources': 'Task Sources',
        'settings.tasks.taskProviders': 'Task Providers',
        'browser.homePage': 'Home Page',
        'browser.searchEngine': 'Search Engine',
        'browser.linkRouting': 'Link Routing',
        'browser.sessionCookies': 'Session Cookies',
    }
    if path in overrides:
        return overrides[path]
    
    # Default: last component
    parts = path.split('.')
    return camel_to_title(parts[-1])

def get_desc_for_path(path):
    """Get a description for a given path."""
    overrides = {
        'settings.general.language': 'Select your preferred interface language.',
        'settings.general.workspace': 'Configure workspace behavior and directories.',
        'settings.general.workspace.directory': 'Default directory for new workspaces.',
        'settings.general.workspace.nest': 'Nest related workspaces under a parent folder.',
        'settings.general.workspace.skipDeleteWorktreeConfirm': 'Skip confirmation when deleting a worktree.',
        'settings.general.workspace.skipDeleteAutomationConfirm': 'Skip confirmation when deleting an automation.',
        'settings.general.updates.check': 'Check for updates manually or configure auto-check.',
        'settings.general.support.starGithub': 'Star the Orca project on GitHub.',
        'settings.appearance.theme': 'Choose between light, dark, or system theme.',
        'settings.appearance.zoom': 'Adjust the global zoom level.',
        'settings.appearance.typography': 'Configure font and text rendering options.',
        'settings.appearance.layout': 'Customize the application layout.',
        'settings.appearance.layout.rightSidebar': 'Show or hide the right sidebar.',
        'settings.appearance.layout.gitIgnored': 'Show git-ignored files in the file explorer.',
        'settings.appearance.titlebar': 'Configure the window title bar appearance.',
        'settings.appearance.titlebar.appName': 'Show the application name in the title bar.',
        'settings.appearance.statusBar': 'Configure the status bar at the bottom of the window.',
        'settings.appearance.sidebar.tasksButton': 'Show the tasks button in the sidebar.',
        'settings.input.middleClickPaste': 'Paste clipboard content with middle mouse click.',
        'settings.shortcuts.ctrlTabOrder': 'Order of tabs when using Ctrl+Tab to switch.',
        'settings.terminal.windowsShell': 'Default shell on Windows.',
        'settings.terminal.floating': 'Enable floating terminal window.',
        'settings.terminal.quickCommands': 'Quick access commands for the terminal.',
        'settings.terminal.typography': 'Terminal font and text rendering options.',
        'settings.terminal.rendering': 'Terminal rendering engine settings.',
        'settings.terminal.cursor': 'Terminal cursor style and behavior.',
        'settings.terminal.paneStyling': 'Styling options for terminal panes.',
        'settings.terminal.setupScript': 'Script to run when opening a new terminal.',
        'settings.terminal.advanced': 'Advanced terminal configuration options.',
        'settings.commitMessageAi.enabled': 'Enable AI-generated commit messages.',
        'settings.commitMessageAi.agent': 'Select the AI agent for commit messages.',
        'settings.commitMessageAi.customCommand': 'Custom command to generate commit messages.',
        'settings.commitMessageAi.model': 'AI model to use for commit message generation.',
        'settings.commitMessageAi.thinking': 'Show AI thinking process for commit messages.',
        'settings.commitMessageAi.customPrompt': 'Custom prompt template for commit messages.',
        'settings.computerUse.installSkill': 'Install a skill for computer use automation.',
        'settings.experimental.pet': 'Enable the virtual pet companion.',
        'settings.experimental.agentsView': 'Enable the experimental agents view.',
        'settings.experimental.symlinks': 'Enable symlink support in the file explorer.',
        'settings.git.branchPrefix': 'Prefix for new branch names.',
        'settings.git.refreshLocalBaseRef': 'Automatically refresh local base reference.',
        'settings.git.githubApiBudget': 'Rate limit budget for GitHub API calls.',
        'settings.git.orcaAttribution': 'Add Orca attribution to commits.',
        'settings.mcp': 'Model Context Protocol server configuration.',
        'settings.tasks.taskSources': 'Sources to pull tasks from.',
        'settings.tasks.taskProviders': 'Task provider integrations.',
        'browser.homePage': 'Default home page for the built-in browser.',
        'browser.searchEngine': 'Default search engine for the built-in browser.',
        'browser.linkRouting': 'How to handle external link clicks.',
        'browser.sessionCookies': 'How to manage session cookies.',
    }
    if path in overrides:
        return overrides[path]
    
    # Default
    parts = path.split('.')
    name = camel_to_title(parts[-1])
    return f'Configure {name} settings.'

def fix_en_ts(content):
    lines = content.split('\n')
    result = []
    path_stack = []
    current_obj_depth = 0

    i = 0
    while i < len(lines):
        line = lines[i]
        original = line

        stripped = line.strip()
        
        # Track object depth
        if stripped.endswith('{') and not stripped.startswith('//') and not stripped.startswith('/*'):
            match = re.match(r"^(\s*)(\w+):\s*\{", stripped)
            if match:
                key = match.group(2)
                path_stack.append(key)
                current_obj_depth += 1
            elif stripped == '{':
                current_obj_depth += 1
        elif stripped == '}' or (stripped.startswith('}') and not stripped.startswith('//') and not stripped.startswith('/*')):
            if current_obj_depth > 0:
                current_obj_depth -= 1
                if path_stack:
                    path_stack.pop()

        current_path = '.'.join(path_stack)

        # Replace title: 'Title'
        if "title: 'Title'" in line:
            real_title = get_title_for_path(current_path)
            line = line.replace("title: 'Title'", f"title: '{real_title}'")

        # Replace description: 'Description'
        if "description: 'Description'" in line:
            real_desc = get_desc_for_path(current_path)
            line = line.replace("description: 'Description'", f"description: '{real_desc}'")

        result.append(line)
        i += 1

    return '\n'.join(result)

def main():
    en_path = 'src/renderer/src/locales/en.ts'
    content = load_file(en_path)

    placeholders = {
        "title: 'Title'": content.count("title: 'Title'"),
        "description: 'Description'": content.count("description: 'Description'"),
        "label: 'Label'": content.count("label: 'Label'"),
        "helper: 'Helper'": content.count("helper: 'Helper'"),
    }

    print("Before fix:")
    for k, v in placeholders.items():
        print(f"  {k}: {v}")

    fixed = fix_en_ts(content)

    new_placeholders = {
        "title: 'Title'": fixed.count("title: 'Title'"),
        "description: 'Description'": fixed.count("description: 'Description'"),
        "label: 'Label'": fixed.count("label: 'Label'"),
        "helper: 'Helper'": fixed.count("helper: 'Helper'"),
    }

    print("\nAfter fix:")
    for k, v in new_placeholders.items():
        print(f"  {k}: {v}")

    save_file(en_path, fixed)
    print(f"\nSaved to {en_path}")


if __name__ == '__main__':
    main()
