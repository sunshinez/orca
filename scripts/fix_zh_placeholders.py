#!/usr/bin/env python3
"""Fix placeholder values in zh-CN.ts with Chinese translations."""

import re

def load_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def save_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def camel_to_title(s):
    """Convert camelCase to Chinese title."""
    if not s:
        return ''
    # Direct translations for common terms
    translations = {
        'workspace': '工作区',
        'directory': '目录',
        'sandbox': '沙盒',
        'autoLock': '自动锁定',
        'currentDirectory': '当前目录',
        'language': '语言',
        'theme': '主题',
        'scale': '缩放',
        'fontSize': '字体大小',
        'appearance': '外观',
        'input': '输入',
        'terminal': '终端',
        'browserUse': '浏览器自动化',
        'computerUse': '计算机自动化',
        'commitMessageAi': '提交信息 AI',
        'developerPermissions': '开发者权限',
        'experimental': '实验性功能',
        'agents': '代理',
        'integrations': '集成',
        'git': 'Git',
        'tasks': '任务',
        'voice': '语音',
        'mobile': '移动端',
        'ssh': 'SSH',
        'privacy': '隐私',
        'notifications': '通知',
        'shortcuts': '快捷键',
        'browser': '浏览器',
        'general': '通用',
        'editor': '编辑器',
        'updates': '更新',
        'support': '支持',
        'zoom': '缩放',
        'typography': '排版',
        'layout': '布局',
        'titlebar': '标题栏',
        'statusBar': '状态栏',
        'sidebar': '侧边栏',
        'ctrlTabOrder': 'Ctrl+Tab 顺序',
        'windowsShell': 'Windows 外壳',
        'floating': '浮动',
        'quickCommands': '快捷命令',
        'rendering': '渲染',
        'cursor': '光标',
        'paneStyling': '窗格样式',
        'setupScript': '启动脚本',
        'advanced': '高级',
        'enabled': '启用',
        'agent': '代理',
        'customCommand': '自定义命令',
        'model': '模型',
        'thinking': '思考',
        'customPrompt': '自定义提示',
        'installSkill': '安装技能',
        'pet': '宠物模式',
        'agentsView': '代理视图',
        'symlinks': '符号链接',
        'branchPrefix': '分支前缀',
        'refreshLocalBaseRef': '刷新本地基引用',
        'githubApiBudget': 'GitHub API 预算',
        'orcaAttribution': 'Orca 署名',
        'mcp': 'MCP 服务器',
        'taskSources': '任务来源',
        'taskProviders': '任务提供方',
        'homePage': '主页',
        'searchEngine': '搜索引擎',
        'linkRouting': '链接路由',
        'sessionCookies': '会话 Cookie',
        'universalToolCallShortcut': '通用工具调用快捷键',
        'messageComposerEnterToSubmit': '回车提交',
        'defaultShell': '默认外壳',
        'fontFamily': '字体族',
        'lineHeight': '行高',
        'cursorStyle': '光标样式',
        'cursorBlink': '光标闪烁',
        'scrollback': '回滚',
        'workingDirectory': '工作目录',
        'integratedCopilot': '集成 Copilot',
        'port': '端口',
        'extPort': '扩展端口',
        'apiKey': 'API 密钥',
        'provider': '提供方',
        'ghostty': 'Ghostty CLI',
        'aiReview': 'AI 审查',
        'aiInlineEdit': 'AI 内联编辑',
        'aiCommitMessage': 'AI 提交信息',
        'aiCodeIndexing': 'AI 代码索引',
        'aiAutoFix': 'AI 自动修复',
        'aiOrcaIgnore': 'AI Orca 忽略',
        'aiDiffReview': 'AI 差异审查',
        'orcaCli': 'Orca CLI',
        'node': 'Node.js',
        'python': 'Python',
        'docker': 'Docker',
        'github': 'GitHub',
        'gitlab': 'GitLab',
        'bitbucket': 'Bitbucket',
        'azureDevops': 'Azure DevOps',
        'gitea': 'Gitea',
        'linear': 'Linear',
        'autoFetch': '自动获取',
        'pushOnCommit': '提交时推送',
        'showStash': '显示暂存',
        'diffTool': '差异工具',
        'mergeTool': '合并工具',
        'defaultView': '默认视图',
        'showCompleted': '显示已完成',
        'syncEnabled': '同步启用',
        'showBanner': '显示横幅',
        'keepAlive': '保持连接',
        'telemetry': '遥测',
        'crashReports': '崩溃报告',
        'middleClickPaste': '中键粘贴',
        'rightSidebar': '右侧边栏',
        'gitIgnored': 'Git 忽略文件',
        'appName': '应用名称',
        'tasksButton': '任务按钮',
        'starGithub': '在 GitHub 上点赞',
        'nest': '嵌套',
        'skipDeleteWorktreeConfirm': '跳过删除工作树确认',
        'skipDeleteAutomationConfirm': '跳过删除自动化确认',
        'autoSave': '自动保存',
        'autoSaveDelay': '自动保存延迟',
        'minimap': '小地图',
        'check': '检查',
        'thanks': '感谢',
    }
    if s in translations:
        return translations[s]
    # Fallback: try to translate by parts
    return s

# Title overrides with Chinese
title_overrides = {
    'settings.general.workspace': '工作区',
    'settings.general.editor': '编辑器',
    'settings.general.updates': '更新',
    'settings.general.support': '支持',
    'settings.appearance.theme': '主题',
    'settings.appearance.zoom': '缩放',
    'settings.appearance.typography': '排版',
    'settings.appearance.layout': '布局',
    'settings.appearance.titlebar': '标题栏',
    'settings.appearance.statusBar': '状态栏',
    'settings.appearance.sidebar': '侧边栏',
    'settings.shortcuts.ctrlTabOrder': 'Ctrl+Tab 顺序',
    'settings.terminal.windowsShell': 'Windows 外壳',
    'settings.terminal.floating': '浮动终端',
    'settings.terminal.quickCommands': '快捷命令',
    'settings.terminal.typography': '排版',
    'settings.terminal.rendering': '渲染',
    'settings.terminal.cursor': '光标',
    'settings.terminal.paneStyling': '窗格样式',
    'settings.terminal.setupScript': '启动脚本',
    'settings.terminal.advanced': '高级',
    'settings.commitMessageAi.enabled': '启用',
    'settings.commitMessageAi.agent': '代理',
    'settings.commitMessageAi.customCommand': '自定义命令',
    'settings.commitMessageAi.model': '模型',
    'settings.commitMessageAi.thinking': '思考',
    'settings.commitMessageAi.customPrompt': '自定义提示',
    'settings.computerUse.installSkill': '安装技能',
    'settings.experimental.pet': '宠物模式',
    'settings.experimental.agentsView': '代理视图',
    'settings.experimental.symlinks': '符号链接',
    'settings.git.branchPrefix': '分支前缀',
    'settings.git.refreshLocalBaseRef': '刷新本地基引用',
    'settings.git.githubApiBudget': 'GitHub API 预算',
    'settings.git.orcaAttribution': 'Orca 署名',
    'settings.mcp': 'MCP 服务器',
    'settings.tasks.taskSources': '任务来源',
    'settings.tasks.taskProviders': '任务提供方',
    'browser.homePage': '主页',
    'browser.searchEngine': '搜索引擎',
    'browser.linkRouting': '链接路由',
    'browser.sessionCookies': '会话 Cookie',
}

# Description overrides with Chinese
desc_overrides = {
    'settings.general.language': '选择您喜欢的界面语言。',
    'settings.general.workspace': '配置工作区行为和目录。',
    'settings.general.workspace.directory': '新工作区的默认目录。',
    'settings.general.workspace.nest': '将相关工作区嵌套在父文件夹下。',
    'settings.general.workspace.skipDeleteWorktreeConfirm': '删除工作树时跳过确认。',
    'settings.general.workspace.skipDeleteAutomationConfirm': '删除自动化时跳过确认。',
    'settings.general.updates.check': '手动检查更新或配置自动检查。',
    'settings.general.support.starGithub': '在 GitHub 上为 Orca 项目点赞。',
    'settings.appearance.theme': '在浅色、深色或系统主题之间选择。',
    'settings.appearance.zoom': '调整全局缩放级别。',
    'settings.appearance.typography': '配置字体和文本渲染选项。',
    'settings.appearance.layout': '自定义应用布局。',
    'settings.appearance.layout.rightSidebar': '显示或隐藏右侧边栏。',
    'settings.appearance.layout.gitIgnored': '在文件资源管理器中显示 Git 忽略的文件。',
    'settings.appearance.titlebar': '配置窗口标题栏外观。',
    'settings.appearance.titlebar.appName': '在标题栏中显示应用名称。',
    'settings.appearance.statusBar': '配置窗口底部的状态栏。',
    'settings.appearance.sidebar.tasksButton': '在侧边栏中显示任务按钮。',
    'settings.input.middleClickPaste': '使用鼠标中键粘贴剪贴板内容。',
    'settings.shortcuts.ctrlTabOrder': '使用 Ctrl+Tab 切换时的标签顺序。',
    'settings.terminal.windowsShell': 'Windows 上的默认外壳。',
    'settings.terminal.floating': '启用浮动终端窗口。',
    'settings.terminal.quickCommands': '终端的快速访问命令。',
    'settings.terminal.typography': '终端字体和文本渲染选项。',
    'settings.terminal.rendering': '终端渲染引擎设置。',
    'settings.terminal.cursor': '终端光标样式和行为。',
    'settings.terminal.paneStyling': '终端窗格的样式选项。',
    'settings.terminal.setupScript': '打开新终端时运行的脚本。',
    'settings.terminal.advanced': '高级终端配置选项。',
    'settings.commitMessageAi.enabled': '启用 AI 生成的提交信息。',
    'settings.commitMessageAi.agent': '选择用于提交信息的 AI 代理。',
    'settings.commitMessageAi.customCommand': '生成提交信息的自定义命令。',
    'settings.commitMessageAi.model': '用于生成提交信息的 AI 模型。',
    'settings.commitMessageAi.thinking': '显示提交信息的 AI 思考过程。',
    'settings.commitMessageAi.customPrompt': '提交信息的自定义提示模板。',
    'settings.computerUse.installSkill': '安装计算机自动化技能。',
    'settings.experimental.pet': '启用虚拟宠物伴侣。',
    'settings.experimental.agentsView': '启用实验性代理视图。',
    'settings.experimental.symlinks': '在文件资源管理器中启用符号链接支持。',
    'settings.git.branchPrefix': '新分支名称的前缀。',
    'settings.git.refreshLocalBaseRef': '自动刷新本地基引用。',
    'settings.git.githubApiBudget': 'GitHub API 调用的速率限制预算。',
    'settings.git.orcaAttribution': '在提交中添加 Orca 署名。',
    'settings.mcp': '模型上下文协议服务器配置。',
    'settings.tasks.taskSources': '拉取任务的来源。',
    'settings.tasks.taskProviders': '任务提供方集成。',
    'browser.homePage': '内置浏览器的默认主页。',
    'browser.searchEngine': '内置浏览器的默认搜索引擎。',
    'browser.linkRouting': '如何处理外部链接点击。',
    'browser.sessionCookies': '如何管理会话 Cookie。',
}

def fix_zh_ts(content):
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
            if current_path in title_overrides:
                line = line.replace("title: 'Title'", f"title: '{title_overrides[current_path]}'")
            else:
                parts = current_path.split('.')
                line = line.replace("title: 'Title'", f"title: '{camel_to_title(parts[-1])}'")

        # Replace description: 'Description'
        if "description: 'Description'" in line:
            if current_path in desc_overrides:
                line = line.replace("description: 'Description'", f"description: '{desc_overrides[current_path]}'")
            else:
                parts = current_path.split('.')
                name = camel_to_title(parts[-1])
                line = line.replace("description: 'Description'", f"description: '配置{name}设置。'")

        # Replace label: 'Label'
        if "label: 'Label'" in line:
            parts = current_path.split('.')
            line = line.replace("label: 'Label'", f"label: '{camel_to_title(parts[-1])}'")

        # Replace helper: 'Helper'
        if "helper: 'Helper'" in line:
            parts = current_path.split('.')
            name = camel_to_title(parts[-1])
            line = line.replace("helper: 'Helper'", f"helper: '配置{name}设置。'")

        result.append(line)
        i += 1

    return '\n'.join(result)

def main():
    zh_path = 'src/renderer/src/locales/zh-CN.ts'
    content = load_file(zh_path)

    placeholders = {
        "title: 'Title'": content.count("title: 'Title'"),
        "description: 'Description'": content.count("description: 'Description'"),
        "label: 'Label'": content.count("label: 'Label'"),
        "helper: 'Helper'": content.count("helper: 'Helper'"),
    }

    print("Before fix:")
    for k, v in placeholders.items():
        print(f"  {k}: {v}")

    fixed = fix_zh_ts(content)

    new_placeholders = {
        "title: 'Title'": fixed.count("title: 'Title'"),
        "description: 'Description'": fixed.count("description: 'Description'"),
        "label: 'Label'": fixed.count("label: 'Label'"),
        "helper: 'Helper'": fixed.count("helper: 'Helper'"),
    }

    print("\nAfter fix:")
    for k, v in new_placeholders.items():
        print(f"  {k}: {v}")

    save_file(zh_path, fixed)
    print(f"\nSaved to {zh_path}")


if __name__ == '__main__':
    main()
