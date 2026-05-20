#!/usr/bin/env python3
"""Fix placeholder values in en.ts by replacing them with real English text."""

import re
import sys

def load_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def save_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Known label values
KNOWN_LABELS = {
    'settings.general.workspace.directory': 'Workspace Directory',
    'settings.general.workspace.sandbox': 'Sandbox Mode',
    'settings.general.workspace.autoLock': 'Auto-Lock Enabled',
    'settings.general.workspace.currentDirectory': 'Current Directory',
    'settings.appearance.theme': 'Theme',
    'settings.appearance.scale': 'Scale',
    'settings.appearance.fontSize': 'Font Size',
    'settings.input.universalToolCallShortcut': 'Universal Tool Call Shortcut',
    'settings.input.messageComposerEnterToSubmit': 'Enter to Submit',
    'settings.terminal.defaultShell': 'Default Shell',
    'settings.terminal.fontSize': 'Terminal Font Size',
    'settings.terminal.fontFamily': 'Terminal Font Family',
    'settings.terminal.lineHeight': 'Terminal Line Height',
    'settings.terminal.cursorStyle': 'Cursor Style',
    'settings.terminal.cursorBlink': 'Cursor Blink',
    'settings.terminal.scrollback': 'Scrollback',
    'settings.terminal.workingDirectory': 'Working Directory',
    'settings.terminal.integratedCopilot': 'Integrated Copilot',
    'settings.browserUse.step1.port': 'Orca CLI Port',
    'settings.browserUse.step2.extPort': 'Browser Extension Port',
    'settings.browserUse.step3.apiKey': 'OpenAI API Key',
    'settings.browserUse.step3.model': 'AI Model',
    'settings.commitMessageAi.provider': 'Provider',
    'settings.commitMessageAi.model': 'Model',
    'settings.commitMessageAi.apiKey': 'API Key',
    'settings.commitMessageAi.customPrompt': 'Custom Prompt',
    'settings.computerUse.step1.port': 'Orca CLI Port',
    'settings.computerUse.step2.extPort': 'Browser Extension Port',
    'settings.computerUse.step3.apiKey': 'OpenAI API Key',
    'settings.computerUse.step3.model': 'AI Model',
    'settings.developerPermissions.ghostty': 'Ghostty CLI',
    'settings.experimental.aiReview': 'AI Review',
    'settings.experimental.aiInlineEdit': 'AI Inline Edit',
    'settings.experimental.aiCommitMessage': 'AI Commit Message',
    'settings.experimental.aiCodeIndexing': 'AI Code Indexing',
    'settings.experimental.aiAutoFix': 'AI Auto Fix',
    'settings.experimental.aiOrcaIgnore': 'AI Orca Ignore',
    'settings.experimental.aiDiffReview': 'AI Diff Review',
    'settings.agents.orcaCli': 'Orca CLI',
    'settings.agents.node': 'Node.js',
    'settings.agents.python': 'Python',
    'settings.agents.docker': 'Docker',
    'settings.integrations.github': 'GitHub',
    'settings.integrations.gitlab': 'GitLab',
    'settings.integrations.bitbucket': 'Bitbucket',
    'settings.integrations.azureDevops': 'Azure DevOps',
    'settings.integrations.gitea': 'Gitea',
    'settings.integrations.linear': 'Linear',
    'settings.git.autoFetch': 'Auto-fetch Interval',
    'settings.git.pushOnCommit': 'Push on Commit',
    'settings.git.showStash': 'Show Stash',
    'settings.git.diffTool': 'Diff Tool',
    'settings.git.mergeTool': 'Merge Tool',
    'settings.tasks.defaultView': 'Default View',
    'settings.tasks.showCompleted': 'Show Completed',
    'settings.voice.enabled': 'Voice Enabled',
    'settings.voice.language': 'Voice Language',
    'settings.voice.inputDevice': 'Input Device',
    'settings.mobile.syncEnabled': 'Sync Enabled',
    'settings.mobile.notifications': 'Mobile Notifications',
    'settings.ssh.showBanner': 'Show Banner',
    'settings.ssh.keepAlive': 'Keep Alive',
    'settings.privacy.telemetry': 'Telemetry',
    'settings.privacy.crashReports': 'Crash Reports',
}

# Known helper text values
KNOWN_HELPERS = {
    'settings.browserUse.step1.port': 'Port number for the Orca CLI browser extension server (default: 3000)',
    'settings.browserUse.step2.extPort': 'Port number for the browser extension to connect (default: 3001)',
    'settings.browserUse.step3.apiKey': 'Your OpenAI API key for browser automation',
    'settings.browserUse.step3.model': 'AI model to use for browser automation tasks',
    'settings.computerUse.step1.port': 'Port number for the Orca CLI server (default: 3000)',
    'settings.computerUse.step2.extPort': 'Port number for the extension to connect (default: 3001)',
    'settings.computerUse.step3.apiKey': 'Your OpenAI API key for computer use automation',
    'settings.computerUse.step3.model': 'AI model to use for computer use automation tasks',
}

# Known button text values
KNOWN_BUTTONS = {
    'settings.browserUse.step1.test': 'Test Connection',
    'settings.browserUse.step2.install': 'Install Extension',
    'settings.browserUse.step3.save': 'Save Settings',
    'settings.computerUse.step1.test': 'Test Connection',
    'settings.computerUse.step2.install': 'Install Extension',
    'settings.computerUse.step3.save': 'Save Settings',
}

# Parse the en.ts file to understand its structure
# We'll do line-by-line processing with context tracking

def fix_en_ts(content):
    lines = content.split('\n')
    result = []
    path_stack = []
    current_obj_depth = 0

    i = 0
    while i < len(lines):
        line = lines[i]
        original = line

        # Track object depth for path
        stripped = line.strip()
        
        # Check for object open
        if stripped.endswith('{') and not stripped.startswith('//') and not stripped.startswith('/*'):
            # Extract key if present
            match = re.match(r"^(\s*)(\w+):\s*\{", stripped)
            if match:
                key = match.group(2)
                path_stack.append(key)
                current_obj_depth += 1
            elif stripped == '{':
                current_obj_depth += 1
        elif stripped == '}' or stripped.startswith('}') and not stripped.startswith('//') and not stripped.startswith('/*'):
            if current_obj_depth > 0:
                current_obj_depth -= 1
                if path_stack:
                    path_stack.pop()

        # Now check for placeholder replacements
        current_path = '.'.join(path_stack)

        # Replace title: 'Title'
        if "title: 'Title'" in line:
            # Try to find a real title
            real_title = find_real_title(current_path, lines, i)
            if real_title:
                line = line.replace("title: 'Title'", f"title: '{real_title}'")
            else:
                # Try common patterns
                if current_path.endswith('.general'):
                    line = line.replace("title: 'Title'", "title: 'General'")
                elif current_path.endswith('.appearance'):
                    line = line.replace("title: 'Title'", "title: 'Appearance'")
                elif current_path.endswith('.input'):
                    line = line.replace("title: 'Title'", "title: 'Input'")
                elif current_path.endswith('.terminal'):
                    line = line.replace("title: 'Title'", "title: 'Terminal'")
                elif current_path.endswith('.browserUse'):
                    line = line.replace("title: 'Title'", "title: 'Browser Use'")
                elif current_path.endswith('.commitMessageAi'):
                    line = line.replace("title: 'Title'", "title: 'Commit Message AI'")
                elif current_path.endswith('.computerUse'):
                    line = line.replace("title: 'Title'", "title: 'Computer Use'")
                elif current_path.endswith('.developerPermissions'):
                    line = line.replace("title: 'Title'", "title: 'Developer Permissions'")
                elif current_path.endswith('.experimental'):
                    line = line.replace("title: 'Title'", "title: 'Experimental'")
                elif current_path.endswith('.agents'):
                    line = line.replace("title: 'Title'", "title: 'Agents'")
                elif current_path.endswith('.integrations'):
                    line = line.replace("title: 'Title'", "title: 'Integrations'")
                elif current_path.endswith('.git'):
                    line = line.replace("title: 'Title'", "title: 'Git'")
                elif current_path.endswith('.tasks'):
                    line = line.replace("title: 'Title'", "title: 'Tasks'")
                elif current_path.endswith('.voice'):
                    line = line.replace("title: 'Title'", "title: 'Voice'")
                elif current_path.endswith('.mobile'):
                    line = line.replace("title: 'Title'", "title: 'Mobile'")
                elif current_path.endswith('.ssh'):
                    line = line.replace("title: 'Title'", "title: 'SSH'")
                elif current_path.endswith('.privacy'):
                    line = line.replace("title: 'Title'", "title: 'Privacy'")
                elif current_path.endswith('.notifications'):
                    line = line.replace("title: 'Title'", "title: 'Notifications'")
                elif current_path.endswith('.shortcuts'):
                    line = line.replace("title: 'Title'", "title: 'Keyboard Shortcuts'")
                elif current_path.endswith('.browser'):
                    line = line.replace("title: 'Title'", "title: 'Browser'")
                elif current_path.endswith('.step1'):
                    line = line.replace("title: 'Title'", "title: 'Step 1: Configure CLI'")
                elif current_path.endswith('.step2'):
                    line = line.replace("title: 'Title'", "title: 'Step 2: Install Extension'")
                elif current_path.endswith('.step3'):
                    line = line.replace("title: 'Title'", "title: 'Step 3: Configure AI'")
                elif current_path.endswith('.linear.dialog'):
                    line = line.replace("title: 'Title'", "title: 'Linear Integration'")

        # Replace description: 'Description'
        if "description: 'Description'" in line:
            real_desc = find_real_description(current_path, lines, i)
            if real_desc:
                line = line.replace("description: 'Description'", f"description: '{real_desc}'")
            else:
                # Common patterns
                if current_path.endswith('.general'):
                    line = line.replace("description: 'Description'", "description: 'General application settings.'")
                elif current_path.endswith('.appearance'):
                    line = line.replace("description: 'Description'", "description: 'Customize the visual appearance.'")
                elif current_path.endswith('.input'):
                    line = line.replace("description: 'Description'", "description: 'Input and keyboard settings.'")
                elif current_path.endswith('.terminal'):
                    line = line.replace("description: 'Description'", "description: 'Terminal emulator preferences.'")
                elif current_path.endswith('.browserUse'):
                    line = line.replace("description: 'Description'", "description: 'Browser automation settings.'")
                elif current_path.endswith('.commitMessageAi'):
                    line = line.replace("description: 'Description'", "description: 'AI-generated commit message settings.'")
                elif current_path.endswith('.computerUse'):
                    line = line.replace("description: 'Description'", "description: 'Computer use automation settings.'")
                elif current_path.endswith('.developerPermissions'):
                    line = line.replace("description: 'Description'", "description: 'Developer permission settings.'")
                elif current_path.endswith('.experimental'):
                    line = line.replace("description: 'Description'", "description: 'Experimental feature settings.'")
                elif current_path.endswith('.agents'):
                    line = line.replace("description: 'Description'", "description: 'Agent configuration settings.'")
                elif current_path.endswith('.integrations'):
                    line = line.replace("description: 'Description'", "description: 'Third-party integrations settings.'")
                elif current_path.endswith('.git'):
                    line = line.replace("description: 'Description'", "description: 'Git version control settings.'")
                elif current_path.endswith('.tasks'):
                    line = line.replace("description: 'Description'", "description: 'Task management settings.'")
                elif current_path.endswith('.voice'):
                    line = line.replace("description: 'Description'", "description: 'Voice input settings.'")
                elif current_path.endswith('.mobile'):
                    line = line.replace("description: 'Description'", "description: 'Mobile sync settings.'")
                elif current_path.endswith('.ssh'):
                    line = line.replace("description: 'Description'", "description: 'SSH connection settings.'")
                elif current_path.endswith('.privacy'):
                    line = line.replace("description: 'Description'", "description: 'Privacy and data settings.'")
                elif current_path.endswith('.notifications'):
                    line = line.replace("description: 'Description'", "description: 'Notification preferences.'")
                elif current_path.endswith('.shortcuts'):
                    line = line.replace("description: 'Description'", "description: 'Keyboard shortcut settings.'")
                elif current_path.endswith('.browser'):
                    line = line.replace("description: 'Description'", "description: 'Browser settings.'")
                elif current_path.endswith('.step1'):
                    line = line.replace("description: 'Description'", "description: 'Configure the Orca CLI for browser automation.'")
                elif current_path.endswith('.step2'):
                    line = line.replace("description: 'Description'", "description: 'Install the browser extension.'")
                elif current_path.endswith('.step3'):
                    line = line.replace("description: 'Description'", "description: 'Configure AI settings for browser automation.'")

        # Replace label: 'Label'
        if "label: 'Label'" in line:
            label_path = get_label_path(current_path, lines, i)
            if label_path in KNOWN_LABELS:
                line = line.replace("label: 'Label'", f"label: '{KNOWN_LABELS[label_path]}'")
            else:
                # Try to infer from parent path
                parent_key = path_stack[-1] if path_stack else ''
                if parent_key:
                    # Convert camelCase to Title Case
                    label = camel_to_title(parent_key)
                    line = line.replace("label: 'Label'", f"label: '{label}'")

        # Replace helper: 'Helper'
        if "helper: 'Helper'" in line:
            helper_path = get_helper_path(current_path, lines, i)
            if helper_path in KNOWN_HELPERS:
                line = line.replace("helper: 'Helper'", f"helper: '{KNOWN_HELPERS[helper_path]}'")
            else:
                # Try to provide a generic helper
                parent_key = path_stack[-1] if path_stack else ''
                if parent_key:
                    line = line.replace("helper: 'Helper'", f"helper: 'Configure {camel_to_title(parent_key)} settings.'")

        # Replace button: 'Button'
        if "button: 'Button'" in line:
            button_path = get_button_path(current_path, lines, i)
            if button_path in KNOWN_BUTTONS:
                line = line.replace("button: 'Button'", f"button: '{KNOWN_BUTTONS[button_path]}'")
            else:
                line = line.replace("button: 'Button'", "button: 'Submit'")

        # Replace helperText: 'Helper'
        if "helperText: 'Helper'" in line:
            line = line.replace("helperText: 'Helper'", "helperText: ''")

        result.append(line)
        i += 1

    return '\n'.join(result)


def find_real_title(path, lines, i):
    """Try to find a real title from context."""
    # Step titles
    if 'step1' in path:
        return 'Step 1: Configure CLI'
    if 'step2' in path:
        return 'Step 2: Install Extension'
    if 'step3' in path:
        return 'Step 3: Configure AI'
    return None


def find_real_description(path, lines, i):
    """Try to find a real description from context."""
    return None


def get_label_path(current_path, lines, i):
    """Get the full path for a label key."""
    # Look at the current line's indentation context
    stripped = lines[i].strip()
    # Find the parent object name
    match = re.match(r"^(\s*)(\w+):", stripped)
    if match:
        key = match.group(2)
        if current_path:
            return f"{current_path}.{key}"
        return key
    return current_path


def get_helper_path(current_path, lines, i):
    """Get the full path for a helper key."""
    return get_label_path(current_path, lines, i)


def get_button_path(current_path, lines, i):
    """Get the full path for a button key."""
    return get_label_path(current_path, lines, i)


def camel_to_title(s):
    """Convert camelCase to Title Case."""
    # Handle acronyms
    result = []
    for i, char in enumerate(s):
        if i == 0:
            result.append(char.upper())
        elif char.isupper():
            result.append(' ')
            result.append(char)
        else:
            result.append(char)
    return ''.join(result)


def main():
    en_path = 'src/renderer/src/locales/en.ts'
    content = load_file(en_path)

    # Check for placeholders
    placeholders = {
        "title: 'Title'": content.count("title: 'Title'"),
        "description: 'Description'": content.count("description: 'Description'"),
        "label: 'Label'": content.count("label: 'Label'"),
        "helper: 'Helper'": content.count("helper: 'Helper'"),
        "button: 'Button'": content.count("button: 'Button'"),
        "helperText: 'Helper'": content.count("helperText: 'Helper'"),
    }

    print("Before fix:")
    for k, v in placeholders.items():
        print(f"  {k}: {v}")

    fixed = fix_en_ts(content)

    # Check again
    new_placeholders = {
        "title: 'Title'": fixed.count("title: 'Title'"),
        "description: 'Description'": fixed.count("description: 'Description'"),
        "label: 'Label'": fixed.count("label: 'Label'"),
        "helper: 'Helper'": fixed.count("helper: 'Helper'"),
        "button: 'Button'": fixed.count("button: 'Button'"),
        "helperText: 'Helper'": fixed.count("helperText: 'Helper'"),
    }

    print("\nAfter fix:")
    for k, v in new_placeholders.items():
        print(f"  {k}: {v}")

    save_file(en_path, fixed)
    print(f"\nSaved to {en_path}")


if __name__ == '__main__':
    main()
