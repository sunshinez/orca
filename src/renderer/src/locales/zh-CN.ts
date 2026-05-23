/* eslint-disable max-lines */
export const zhCN = {
  common: {
    save: '保存',
    cancel: '取消',
    delete: '删除',
    confirm: '确认',
    loading: '加载中',
    browse: '浏览',
    restart: '重启',
    update: '更新',
    check: '检查',
    install: '安装',
    enabled: '已启用',
    disabled: '已禁用',
    reset: '重置',
    discard: '放弃',
    saving: '保存中',
    refresh: '刷新',
    clear: '清除',
    remove: '移除'
  },
  settings: {
    nav: {
      general: {
        title: '通用',
        description: '工作区、编辑器和应用默认设置。'
      },
      agents: {
        title: '智能体',
        description: '默认智能体和命令覆盖。'
      },
      accounts: {
        title: '账户',
        description: 'GitHub 和 GitLab 认证。'
      },
      integrations: {
        title: '集成',
        description: 'GitHub、GitLab、Linear 等。'
      },
      git: {
        title: 'Git',
        description: '分支前缀、基准引用和提交信息 AI。'
      },
      tasks: {
        title: '任务',
        description: 'GitHub、GitLab 和 Linear 任务源。'
      },
      appearance: {
        title: '外观',
        description: '主题、缩放、字体和布局。'
      },
      input: {
        title: '输入',
        description: '鼠标和键盘行为。'
      },
      terminal: {
        title: '终端',
        description: 'Shell、渲染和快捷命令。'
      },
      browser: {
        title: '浏览器',
        description: '主页、搜索引擎和 Cookie。'
      },
      notifications: {
        title: '通知',
        description: '桌面提醒和声音。'
      },
      orchestration: {
        title: '编排',
        description: '智能体工作流和触发器。'
      },
      servers: {
        title: '服务器',
        descriptionDesktop: '远程环境和运行时。',
        descriptionWeb: '远程环境和运行时（网页版）。'
      },
      ssh: {
        title: 'SSH',
        description: '远程 SSH 连接。'
      },
      mobile: {
        title: '移动端',
        description: '将手机与 Orca 配对。'
      },
      computerUse: {
        title: '计算机使用',
        description: '允许智能体控制本地应用。'
      },
      voice: {
        title: '语音',
        description: '听写和语音转文字。'
      },
      developerPermissions: {
        title: '开发者权限',
        description: 'CLI 工具的 macOS 隐私访问。'
      },
      privacy: {
        title: '隐私',
        description: '遥测和数据共享。'
      },
      shortcuts: {
        title: '快捷键',
        description: '键盘快捷键参考。'
      },
      stats: {
        title: '统计',
        description: '使用统计。'
      },
      experimental: {
        title: '实验功能',
        description: '测试功能和预览。'
      }
    },
    navGroups: {
      setup: '设置',
      workflows: '工作流',
      interface: '界面',
      capabilities: 'AI 能力',
      remote: '远程访问',
      safety: '安全',
      experimental: '实验性',
      repositories: '仓库'
    },
    badge: {
      optional: '可选',
      beta: '测试版'
    },
    noResults: '未找到 "{{query}}" 的相关设置',
    platform: {
      windows: 'Windows',
      linux: 'Linux',
      thisPlatform: '当前平台'
    },
    sections: {
      general: {
        title: '通用',
        description: '工作区默认值、应用设置和维护。'
      },
      agents: {
        title: '代理',
        description: '管理 AI 代理，设置默认值和自定义命令。'
      },
      accounts: {
        title: 'AI 提供商账户',
        description: '可选。Orca 可与您现有的提供商登录配合使用；仅在希望 Orca 帮助切换时添加账户。'
      },
      integrations: {
        title: '集成',
        description: '连接 GitHub、GitLab、Linear 和源代码托管服务。'
      },
      git: {
        title: 'Git 与源代码控制',
        description: '分支命名、基引用、署名和 AI 提交信息。'
      },
      tasks: {
        title: '任务来源',
        description: '选择在任务页面和侧边栏中显示哪些任务提供方。'
      },
      terminal: {
        title: '终端',
        description: 'shell、终端外观、快捷命令和窗格行为。'
      },
      browser: {
        title: '浏览器',
        description: '主页、链接路由和会话 Cookie。'
      },
      appearance: {
        title: '外观',
        description: '主题、缩放、应用字体、侧边栏和状态栏。'
      },
      input: {
        title: '输入与编辑',
        description: '选择和编辑行为。'
      },
      notifications: {
        title: '通知',
        description: '代理活动和终端事件的本地桌面通知。'
      },
      shortcuts: {
        title: '快捷键',
        description: '常用操作的键盘快捷键。'
      },
      stats: {
        title: '统计与用量',
        description: 'Orca 统计以及 Claude、Codex 和 OpenCode 用量分析。'
      },
      orchestration: {
        title: '编排',
        description: '通过 Orca 协调多个编码代理。'
      },
      ssh: {
        title: 'SSH 主机',
        description: '用于文件、终端和 Git 的远程 SSH 主机。'
      },
      developerPermissions: {
        title: 'macOS 权限',
        description: '终端启动的开发工具的 macOS 隐私访问权限。'
      },
      privacy: {
        title: '隐私与遥测',
        description: '匿名使用数据和遥测控制。'
      },
      experimental: {
        title: '实验功能',
        description: '仍在完善的新功能。欢迎尝试。'
      },
      computerUse: {
        title: '计算机使用',
        description: '允许代理控制您计算机上的任何应用。',
        previewAriaLabel: '{{platform}} 计算机使用预览详情',
        previewTooltip: '{{platform}} 计算机使用是早期预览功能。某些应用和桌面环境可能表现不一致。'
      },
      voice: {
        title: '语音',
        description: '使用设备端模型进行本地语音转文字听写。'
      },
      servers: {
        title: '远程 Orca 服务器',
        descriptionDesktop: '在本地桌面模式和配对的远程 Orca 运行时之间切换。',
        descriptionWeb: '将此浏览器连接到已保存的 Orca 服务器。'
      },
      mobile: {
        title: '移动端',
        description: '从手机控制终端和代理。'
      }
    },
    general: {
      title: '通用',
      description: '配置通用设置。',
      language: {
        label: '语言',
        description: '选择您喜欢的界面语言。'
      },
      workspace: {
        title: '工作区',
        description: '配置工作区行为和目录。',
        directory: {
          label: '目录',
          description: '新工作区的默认目录。'
        },
        nest: {
          label: '嵌套',
          description: '将相关工作区嵌套在父文件夹下。'
        },
        skipDeleteWorktreeConfirm: {
          label: '跳过删除工作树确认',
          description: '删除工作树时跳过确认。'
        },
        skipDeleteAutomationConfirm: {
          label: '跳过删除自动化确认',
          description: '删除自动化时跳过确认。'
        },
        askBeforeDeletingWorktrees: {
          label: '删除工作树前询问',
          description: '删除工作树前显示确认对话框。'
        },
        askBeforeDeletingAutomations: {
          label: '删除自动化前询问',
          description: '删除自动化及其运行历史前显示确认对话框。'
        }
      },
      openInMenu: {
        title: '打开方式菜单',
        description: '向工作树的"打开方式"菜单添加自定义启动器。',
        vsCodeIncluded:
          'VS Code 始终默认包含在内。添加可执行文件以在每个工作树的"打开方式"菜单中显示额外条目。',
        commandNotShellParsed:
          '命令不会被 Shell 解析。请仅使用可执行命令名称。如需传递参数，请使用包装脚本。',
        addCursor: '添加 Cursor',
        addZed: '添加 Zed',
        labelPlaceholder: '标签',
        commandPlaceholder: '可执行命令',
        remove: '移除',
        addCustomLauncher: '添加自定义启动器'
      },
      editor: {
        title: '编辑器',
        description: '配置 Orca 如何持久化文件编辑。',
        autoSave: {
          label: '自动保存文件',
          description: '在短暂停顿后自动保存编辑器和可编辑差异的更改。'
        },
        autoSaveDelay: {
          label: '自动保存延迟',
          description: 'Orca 在您最后一次编辑后等待多久才自动保存。',
          firstLaunchDefault: '首次启动默认值为 {{default}} 毫秒。'
        },
        defaultDiffView: {
          label: '默认差异视图',
          description: '默认显示 Git 差异的首选展示格式。',
          inline: '内联',
          sideBySide: '并排'
        },
        defaultDiffFileTree: {
          label: '默认差异文件树',
          description: '打开组合差异视图时显示或隐藏文件树。',
          shown: '显示',
          hidden: '隐藏'
        },
        minimap: {
          label: '迷你地图',
          description: '编辑文件时显示迷你地图概览。'
        },
        markdownReviewNotes: {
          label: 'Markdown 审阅笔记',
          description: '在富编辑器模式和代理交接操作中显示本地 Markdown 笔记控件。'
        }
      },
      cacheTimer: {
        title: 'Prompt 缓存计时器',
        description:
          'Claude 会缓存您的对话以降低成本。空闲时间过长时缓存会过期，下一条消息将以更高的成本重新发送完整上下文。此功能显示倒计时，让您知道何时可以继续。',
        cacheTimer: {
          label: '缓存计时器',
          description: 'Claude 代理进入空闲状态后在侧边栏显示倒计时。'
        },
        timerDuration: {
          label: '计时器时长',
          description: '请将其与您的提供商缓存 TTL 匹配。默认值为 5 分钟。'
        },
        fiveMinutes: '5 分钟',
        oneHour: '1 小时'
      },
      updates: {
        title: '更新',
        check: {
          label: '检查',
          description: '手动检查更新或配置自动检查。'
        },
        idle: '启动时会自动检查更新。',
        checking: '正在检查更新...',
        notAvailable: '当前已是最新版本。',
        errorCheck: '更新检查失败。',
        errorDownload: '更新出错。'
      },
      support: {
        title: '支持',
        starGithub: {
          label: '在 GitHub 上点赞',
          description: '在 GitHub 上为 Orca 项目点赞。'
        },
        thanks: '感谢'
      }
    },
    appearance: {
      theme: {
        title: '主题',
        description: '在浅色、深色或系统主题之间选择。'
      },
      zoom: {
        title: '缩放',
        description: '调整全局缩放级别。'
      },
      typography: {
        title: '排版',
        description: '配置字体和文本渲染选项。',
        label: '排版'
      },
      layout: {
        title: '布局',
        description: '自定义应用布局。',
        rightSidebar: {
          label: '右侧边栏',
          description: '显示或隐藏右侧边栏。'
        },
        gitIgnored: {
          label: 'Git 忽略文件',
          description: '在文件资源管理器中显示 Git 忽略的文件。'
        }
      },
      titlebar: {
        title: '标题栏',
        description: '配置窗口标题栏外观。',
        appName: {
          label: '应用名称',
          description: '在标题栏中显示应用名称。'
        }
      },
      statusBar: {
        title: '状态栏',
        description: '配置窗口底部的状态栏。'
      },
      sidebar: {
        title: '侧边栏',
        tasksButton: {
          label: '任务按钮',
          description: '在侧边栏中显示任务按钮。'
        }
      }
    },
    input: {
      middleClickPaste: {
        label: '中键粘贴',
        description: '使用鼠标中键粘贴剪贴板内容。'
      }
    },
    shortcuts: {
      global: '全局',
      tabs: '标签页',
      tabNavigation: '标签页导航',
      terminalPanes: '终端窗格',
      shortcut: '快捷键',
      ctrlTabOrder: {
        title: 'Ctrl+Tab 顺序',
        description: '使用 Ctrl+Tab 切换时的标签顺序。',
        label: 'Ctrl+Tab 顺序',
        helper: '配置Ctrl+Tab 顺序设置。',
        mostRecent: '最近使用',
        tabStripOrder: '标签页顺序'
      },
      title: '快捷键',
      subtitle: '副标题'
    },
    terminal: {
      windowsShell: {
        title: 'Windows shell',
        description: 'Windows 上的默认shell。',
        powershell: 'PowerShell',
        commandPrompt: '命令提示符',
        wsl: 'WSL',
        effectDescription: '打开新终端窗格时使用的shell。仅对新终端生效。'
      },
      floating: {
        title: '浮动终端',
        description: '启用浮动终端窗口。',
        enable: '启用',
        enableDescription: '显示一个可通过全局快捷键切换的浮动终端窗口。',
        defaultDirectory: '默认目录',
        defaultDirectoryDescription: '浮动终端打开时的工作目录。',
        toggleLocation: '切换位置',
        chooseDirectoryAriaLabel: '选择浮动终端目录',
        floatingButton: '浮动按钮',
        statusBar: '状态栏',
        keyboardShortcutHint: '无论切换按钮显示在何处，键盘快捷键始终有效。'
      },
      quickCommands: {
        title: '快捷命令',
        description: '终端的快速访问命令。',
        savedCommandsLabel: '已保存命令',
        savedCommandsDescription: '命令将作为纯文本终端输入发送到当前窗格。',
        addCommand: '添加命令',
        filterAll: '全部',
        filterGlobal: '全局',
        filterRepository: '仓库',
        chooseRepositoryPlaceholder: '选择仓库',
        noCommandsSaved: '尚未保存快捷命令。',
        noCommandsMatchScope: '没有匹配当前范围的命令。',
        untitled: '未命名',
        noCommandText: '无命令文本',
        enterLabel: '回车',
        insertLabel: '插入',
        editAriaLabel: '编辑 {{label}}',
        removeAriaLabel: '移除 {{label}}',
        scopeGlobal: '全局',
        missingRepo: '仓库不存在'
      },
      darkTheme: {
        title: '暗色主题',
        description: '选择暗色模式下终端窗格使用的主题。',
        themeLabel: '暗色主题',
        themeDescription: '选择暗色模式下使用的终端主题。',
        dividerColorLabel: '暗色分隔线颜色',
        dividerColorDescription: '控制暗色模式下窗格之间的分隔线颜色。',
        previewTitle: '暗色模式预览',
        previewDescriptionSystem: '系统当前为 {{mode}} 模式。',
        previewDescriptionFixed: 'Orca 当前处于 {{mode}} 模式。',
        modeDark: '暗黑',
        modeLight: '亮色'
      },
      lightTheme: {
        useSeparateTitle: '在亮色模式下使用独立主题',
        useSeparateDescription: '禁用时，亮色模式将复用暗色终端主题。',
        title: '亮色主题',
        description: '配置可选的亮色模式终端外观。',
        themeLabel: '亮色主题',
        themeDescription: '选择亮色模式下使用的终端主题。',
        dividerColorLabel: '亮色分隔线颜色',
        dividerColorDescription: '控制亮色模式下窗格之间的分隔线颜色。',
        previewTitle: '亮色模式预览',
        previewDescription: '更改亮色主题或分隔线颜色时实时更新。'
      },
      window: {
        title: '窗口',
        description: '窗口外观和背景设置。',
        backgroundOpacityLabel: '背景不透明度',
        backgroundOpacityDescription: '控制终端背景的透明度。',
        backgroundOpacityDescriptionFull: '控制终端背景的透明度。1 为完全不透明，0 为完全透明。',
        windowBlurLabel: '窗口模糊',
        windowBlurDescription: '为终端窗口应用背景模糊效果。需要重启。',
        restartRequired: '需要重启',
        restartDescription: '重启 Orca 以应用窗口模糊更改。',
        restarting: '正在重启…',
        restartNow: '立即重启',
        horizontalPaddingLabel: '水平内边距',
        horizontalPaddingDescription: '终端网格周围的水平内边距（像素）。',
        verticalPaddingLabel: '垂直内边距',
        verticalPaddingDescription: '终端网格周围的垂直内边距（像素）。',
        hideMouseWhileTypingLabel: '打字时隐藏鼠标',
        hideMouseWhileTypingDescription: '在终端中打字时隐藏鼠标光标。',
        colorOverridesLabel: '颜色覆盖',
        colorOverridesDescription: '覆盖单个终端颜色。',
        colorOverridesButton: '颜色覆盖',
        resetAllColorOverrides: '重置所有颜色覆盖',
        colorGroupBase: '基础',
        colorGroupAnsiNormal: 'ANSI 标准',
        colorGroupAnsiBright: 'ANSI 高亮',
        colorForeground: '前景色',
        colorForegroundDesc: '主文本颜色',
        colorBackground: '背景色',
        colorBackgroundDesc: '终端背景颜色',
        colorCursor: '光标',
        colorCursorDesc: '光标颜色',
        colorCursorText: '光标文本',
        colorCursorTextDesc: '光标下方文本的颜色（块光标）',
        colorSelectionBackground: '选区背景',
        colorSelectionBackgroundDesc: '选中文字的背景颜色',
        colorSelectionForeground: '选区前景',
        colorSelectionForegroundDesc: '选中文字的文本颜色',
        colorBoldText: '粗体文本',
        colorBoldTextDesc: '粗体文本的颜色。未设置时回退到普通颜色。',
        colorBlack: '黑色',
        colorBlackDesc: 'ANSI 黑色',
        colorRed: '红色',
        colorRedDesc: 'ANSI 红色',
        colorGreen: '绿色',
        colorGreenDesc: 'ANSI 绿色',
        colorYellow: '黄色',
        colorYellowDesc: 'ANSI 黄色',
        colorBlue: '蓝色',
        colorBlueDesc: 'ANSI 蓝色',
        colorMagenta: '洋红',
        colorMagentaDesc: 'ANSI 洋红',
        colorCyan: '青色',
        colorCyanDesc: 'ANSI 青色',
        colorWhite: '白色',
        colorWhiteDesc: 'ANSI 白色',
        colorBrightBlack: '亮黑',
        colorBrightBlackDesc: 'ANSI 亮黑',
        colorBrightRed: '亮红',
        colorBrightRedDesc: 'ANSI 亮红',
        colorBrightGreen: '亮绿',
        colorBrightGreenDesc: 'ANSI 亮绿',
        colorBrightYellow: '亮黄',
        colorBrightYellowDesc: 'ANSI 亮黄',
        colorBrightBlue: '亮蓝',
        colorBrightBlueDesc: 'ANSI 亮蓝',
        colorBrightMagenta: '亮洋红',
        colorBrightMagentaDesc: 'ANSI 亮洋红',
        colorBrightCyan: '亮青',
        colorBrightCyanDesc: 'ANSI 亮青',
        colorBrightWhite: '亮白',
        colorBrightWhiteDesc: 'ANSI 亮白'
      },
      typography: {
        title: '排版',
        description: '终端字体和文本渲染选项。',
        fontSize: '字体大小',
        fontFamily: '字体族',
        fontWeight: '字重',
        fontWeightDescription: '控制终端文本的字重。',
        lineHeight: '行高',
        lineHeightDescription: '控制终端行高倍数。'
      },
      rendering: {
        title: '渲染',
        description: '终端渲染引擎设置。',
        gpuAcceleration: 'GPU 加速',
        gpuAccelerationDescription:
          '控制终端是否使用 xterm.js WebGL 渲染。自动模式在 Linux 上使用 DOM 以避免驱动字形损坏，其他平台则尝试 WebGL 并回退到 DOM。',
        gpuOff: 'WebGL 已禁用；xterm 使用 DOM 渲染器以获得最大兼容性。',
        gpuOn: '始终尝试为终端窗格使用 WebGL 渲染。',
        gpuAuto:
          '自动模式在 Linux 上使用 DOM 渲染器以避免 GPU 字形损坏，其他平台则尝试 WebGL 并回退到 DOM。',
        fontLigaturesLabel: '字体连字',
        fontLigaturesDescription:
          '为支持连字的字体渲染编程连字（如 =>、!=、===）。"自动" 仅在已知连字字体（Fira Code、JetBrains Mono、Cascadia Code、Iosevka 等）上启用连字。',
        fontLigaturesAuto: '自动',
        fontLigaturesOn: '开启',
        fontLigaturesOff: '关闭',
        ligaturesOnAlways: '连字始终开启。不支持连字的字体将按原样渲染。',
        ligaturesOffAlways: '连字始终关闭，即使对于支持连字的字体也是如此。',
        ligaturesAutoEnabled:
          '自动 — 已启用，因为 "{{fontFamily}}" 是已知连字字体。切换到"关闭"可禁用。',
        ligaturesAutoDisabled:
          '自动 — 已禁用，因为 "{{fontFamily}}" 不是已知连字字体。切换到"开启"可强制启用。',
        ligaturesAriaEnabled: '已启用',
        ligaturesAriaDisabled: '已禁用'
      },
      cursor: {
        title: '光标',
        description: '终端光标样式和行为。',
        shapeLabel: '光标形状',
        shapeBar: '竖线',
        shapeBlock: '方块',
        shapeUnderline: '下划线',
        blinkingLabel: '光标闪烁',
        blinkingDescription: '使用所选光标形状的闪烁变体。',
        opacityLabel: '光标不透明度',
        opacityDescription: '终端光标的不透明度。'
      },
      paneStyling: {
        title: '窗格样式',
        description: '终端窗格的样式选项。',
        inactivePaneOpacityLabel: '非活动窗格不透明度',
        inactivePaneOpacityDescription: '应用于当前未激活窗格的不透明度。',
        dividerThicknessLabel: '分隔线粗细',
        dividerThicknessDescription: '窗格分隔线的粗细。',
        rightClickToPasteLabel: '右键粘贴',
        rightClickToPasteDescription:
          '在 Windows 上，右键会将剪贴板内容粘贴到终端中。使用 Ctrl+右键 打开上下文菜单。'
      },
      setupScript: {
        title: '启动脚本',
        description: '打开新终端时运行的脚本。',
        setupScriptLocationLabel: '启动脚本位置',
        setupScriptLocationDescription: '新建工作区时启动脚本的运行位置。',
        newTab: '新标签页',
        splitVertical: '垂直拆分',
        splitHorizontal: '水平拆分',
        runInNewTabAriaLabel: '在新标签页中运行',
        splitVerticallyAriaLabel: '垂直拆分',
        splitHorizontallyAriaLabel: '水平拆分',
        hint: '"新标签页"会在后台打开一个标题为"Setup"的标签页来运行启动命令，不会抢走主终端的焦点。'
      },
      advanced: {
        title: '高级',
        description: '高级终端配置选项。',
        scrollbackSizeLabel: '回滚大小',
        scrollbackSizeDescription: '终端回滚缓冲区的最大大小。',
        scrollbackPreset: '预设',
        scrollbackCustom: '自定义',
        scrollbackPresetAriaLabel: '{{preset}} 兆字节',
        customScrollbackLabel: '自定义回滚',
        customScrollbackDescription: '终端回滚缓冲区的最大大小。',
        wordSeparatorsLabel: '单词分隔符',
        wordSeparatorsDescription: '双击选词时用作单词边界的字符。',
        wordSeparatorsPlaceholder: ` ()[]{},'"\``,
        focusFollowsMouseLabel: '鼠标跟随聚焦',
        focusFollowsMouseDescription:
          '悬停在终端窗格上即可激活，无需点击。与 Ghostty 的 focus-follows-mouse 设置一致。选择和窗口切换仍然安全。',
        copyOnSelectLabel: '选中即复制',
        copyOnSelectDescription: '选中终端内容后自动复制到剪贴板。',
        osc52Label: '允许 TUI 剪贴板写入 (OSC 52)',
        osc52Description:
          '允许终端程序（如 tmux、Neovim、fzf）通过 PTY 复制到系统剪贴板（包括通过 SSH）。默认关闭，因为不受信任的终端输出可能会静默覆盖剪贴板。',
        osc52ShortDescription:
          '允许终端内运行的程序（tmux、Neovim、fzf、SSH 会话）复制到系统剪贴板。默认出于安全考虑禁用。',
        powershellVersionLabel: 'PowerShell 版本',
        powershellVersionDescription:
          '选择 PowerShell shell选项是启动 Windows PowerShell 还是 PowerShell 7+ 用于新终端窗格。',
        powershellAuto: '自动',
        windowsPowershell: 'Windows PowerShell',
        pwshNotAvailable: '当前使用 Windows PowerShell，安装 PowerShell 7+ 后会自动切换。',
        pwshDownload: '下载 PowerShell 7+',
        optionAsAltLabel: 'Option 作为 Alt',
        optionAsAltDescription:
          '控制 macOS Option 键是发送 Alt/Esc 序列还是组合字符。与 Ghostty 的 macos-option-as-alt 一致。',
        optionAsAltAuto: '自动',
        optionAsAltBoth: '左右',
        optionAsAltLeft: '左',
        optionAsAltRight: '右',
        optionAsAltNone: '关闭',
        optionAsAltDetectedUs: '美式英语键盘 — Option 发送 Alt/Esc 序列',
        optionAsAltDetectedNonUs: '非美式布局 — Option 组合字符如 @、€、[、]',
        optionAsAltDetectedUnknown: '未知布局 — Option 组合字符（安全默认值）',
        optionAsAltAutoUs:
          '自动 — 检测到：{{detected}}。左右 Option 键都作为 Alt，符合 macOS 高级用户 readline 习惯。如需输入 Option 层字符请切换到"关闭"。',
        optionAsAltAutoNonUs:
          '自动 — 检测到：{{detected}}。Option 组合键盘布局的特殊字符（@、€、[、] 等）。核心 readline 快捷键（Option+B/F/D）已自动处理。',
        optionAsAltAutoUnknown:
          '自动 — 检测到：{{detected}}。Option 组合键盘布局的特殊字符（@、€、[、] 等）。核心 readline 快捷键（Option+B/F/D）已自动处理。',
        optionAsAltFalse:
          'Option 组合键盘布局的特殊字符。核心 readline 快捷键（Option+B/F/D）已自动处理。',
        optionAsAltTrue:
          '左右 Option 键都发送 Alt/Esc 序列，提供完整的 readline 和 shell 支持。通过输入 Option 特殊字符的功能不可用。',
        optionAsAltSide: '{{side}} Option 键发送 Alt/Esc 序列；另一侧组合特殊字符。'
      }
    },
    integrations: {
      search: {
        github: {
          title: 'GitHub 集成',
          description: '通过 gh CLI 进行 GitHub 身份验证。'
        },
        gitlab: {
          title: 'GitLab 集成',
          description: '通过 glab CLI 进行 GitLab 身份验证。'
        },
        bitbucket: {
          title: 'Bitbucket 集成',
          description: '通过 API 令牌环境变量进行 Bitbucket Cloud 身份验证。'
        },
        azureDevOps: {
          title: 'Azure DevOps 集成',
          description: '通过令牌环境变量进行 Azure DevOps Repos 身份验证。'
        },
        gitea: {
          title: 'Gitea 集成',
          description: '通过 API 令牌环境变量进行 Gitea 身份验证。'
        },
        linear: {
          title: 'Linear 集成',
          description: '连接 Linear 以浏览和关联问题。'
        }
      },
      status: {
        connected: '已连接',
        notInstalled: '未安装',
        notAuthenticated: '未认证',
        notConfigured: '未配置',
        authFailed: '认证失败',
        configured: '已配置',
        optionalSetup: '可选设置'
      },
      github: {
        description: '通过 {{cli}} CLI 获取拉取请求、问题和检查。',
        installPrompt: '安装 GitHub CLI 以启用拉取请求、问题和检查。',
        authPrompt: 'GitHub CLI 已安装但未认证。请在终端中运行以下命令：'
      },
      gitlab: {
        description: '通过 {{cli}} CLI 获取合并请求、问题、待办事项和流水线。',
        installPrompt: '安装 GitLab CLI 以启用合并请求、问题和流水线。',
        authPrompt: 'GitLab CLI 已安装但未认证。请在终端中运行以下命令：'
      },
      bitbucket: {
        descriptionConnected: '{{account}} · 拉取请求和构建状态',
        descriptionConnectedNoAccount: '拉取请求和构建状态',
        descriptionDefault: '通过 Bitbucket Cloud API 令牌获取拉取请求和构建状态。',
        configPrompt: '设置 {{emailVar}} 和 {{tokenVar}}，或设置 {{accessTokenVar}}。',
        authFailedPrompt:
          'Bitbucket 凭据已配置但无法认证。请检查令牌和仓库权限，如果环境变量有更改请重启 Orca。'
      },
      azureDevOps: {
        descriptionConnected: '{{account}} · 拉取请求和构建状态',
        descriptionBaseUrl: '{{baseUrl}} · 拉取请求和构建状态',
        descriptionDefault: '检测到的 Azure Repos 的拉取请求和构建状态',
        descriptionUnconfigured: '通过 Azure DevOps REST API 令牌获取拉取请求和构建状态。',
        configPrompt:
          '设置 {{tokenVar}}，或设置 {{accessTokenVar}}。仅在 Orca 无法从 git 远程推导出 API 基础 URL 时设置 {{baseUrlVar}}。',
        authFailedPrompt:
          'Azure DevOps 凭据已配置但无法认证。请检查令牌、API 基础 URL 和仓库权限，如果环境变量有更改请重启 Orca。'
      },
      gitea: {
        descriptionConnected: '{{account}} · 拉取请求和提交状态',
        descriptionBaseUrl: '{{baseUrl}} · 拉取请求和提交状态',
        descriptionDefault: '检测到的仓库的拉取请求和提交状态',
        descriptionUnconfigured: '通过 Gitea REST API 获取拉取请求和提交状态。',
        configPrompt:
          '公开仓库会从其 git 远程自动检测。为私有仓库设置 {{tokenVar}}，仅在 Orca 无法从远程推导出 API URL 时设置 {{baseUrlVar}}。',
        authFailedPrompt:
          'Gitea 凭据已配置但无法认证。请检查令牌、API 基础 URL 和仓库权限，如果环境变量有更改请重启 Orca。'
      },
      linear: {
        descriptionUnconnected: '浏览问题并将其关联到工作区。',
        workspaceConnected: '个工作区已连接',
        workspacesConnected: '个工作区已连接',
        addWorkspace: '添加工作区',
        connect: '连接',
        verified: '已验证',
        test: '测试',
        testing: '测试中…',
        disconnectWorkspaceAriaLabel: '断开 {{name}}',
        workspaceApiKeyNote: '每个工作区使用其自己本地存储的 API 密钥。',
        dialog: {
          title: '连接 Linear 工作区',
          descriptionPrefix: '粘贴一个 ',
          personalApiKey: '个人 API 密钥',
          descriptionSuffix: ' 以将工作区添加到 Orca。',
          createKeyPrefix: '在 ',
          linearSettingsSecurity: 'Linear 设置 → 安全',
          newApiKey: '新建 API 密钥',
          createKeySuffix: '（不是 {{passkey}}）。',
          newPasskey: '新建通行密钥',
          securityNote: '您的密钥通过操作系统密钥链加密并本地存储。',
          cancel: '取消',
          verifying: '验证中…',
          connect: '连接'
        }
      },
      button: {
        installGithubCli: '安装 GitHub CLI',
        installGitlabCli: '安装 GitLab CLI',
        learnMore: '了解更多',
        reCheck: '重新检查'
      },
      error: {
        connectionFailed: '连接失败'
      }
    },
    agents: {
      command: '命令',
      detected: '已检测到',
      notInstalled: '未安装',
      defaultAgent: '默认代理',
      setAsDefault: '设为默认',
      default: '默认',
      setDefault: '设为默认',
      customizeCommand: '自定义命令',
      overrideHint: '覆盖提示',
      defaultAgentTitle: '默认代理标题',
      defaultAgentDescription: '默认代理描述',
      auto: '自动',
      noAgent: '无代理',
      installed: '已安装',
      detectedCount: '检测数量',
      refreshTooltip: '刷新提示',
      refreshing: '刷新中',
      refresh: '刷新',
      availableToInstall: '可安装',
      agentCount: 'Agent Count',
      detecting: '检测中'
    },
    browserUse: {
      cliLoadError: 'CLI 加载错误',
      cliRegistered: 'CLI 已注册',
      cliRegisterFailed: 'CLI 注册失败',
      copySuccess: '复制成功',
      copyFailed: '复制失败',
      importCookiesSuccess: 'Import Cookies Success',
      importFileSuccess: '导入文件成功',
      enableAria: '启用 Aria',
      title: '浏览器自动化',
      subtitleOff: '副标题关闭',
      subtitleOn: '副标题开启',
      existingSession: '现有会话',
      existingSessionDescription: '现有会话描述',
      openComputerUse: '打开计算机使用',
      step1: {
        title: 'step1',
        description: '配置step1设置。',
        label: 'step1',
        helper: '配置step1设置。',
        registering: '注册中',
        enabled: '已启用',
        enable: '启用'
      },
      step2: {
        title: 'step2',
        description: '配置step2设置。'
      },
      step3: {
        title: 'step3',
        description: '配置step3设置。',
        label: 'step3',
        helper: '配置step3设置。'
      },
      lastImported: '上次导入',
      manageProfiles: '管理配置文件',
      reimport: '重新导入',
      import: '导入',
      fromBrowser: '从浏览器',
      fromFile: '从文件'
    },
    commitMessageAi: {
      enabled: {
        title: '启用',
        description: '启用 AI 生成的提交信息。',
        label: '启用',
        helper: '配置启用设置。'
      },
      agent: {
        title: '代理',
        description: '选择用于提交信息的 AI 代理。',
        label: '代理',
        helper: '配置代理设置。',
        notConfigured: '未配置',
        custom: '自定义',
        unsupportedDefault: 'Unsupported Default'
      },
      customCommand: {
        title: '自定义命令',
        description: '生成提交信息的自定义命令。',
        label: '自定义命令'
      },
      model: {
        title: '模型',
        description: '用于生成提交信息的 AI 模型。',
        label: '模型',
        helper: '配置模型设置。'
      },
      thinking: {
        title: '思考',
        description: '显示提交信息的 AI 思考过程。',
        label: '思考',
        helper: '配置思考设置。'
      },
      customPrompt: {
        title: '自定义提示',
        description: '提交信息的自定义提示模板。',
        label: '自定义提示',
        helper: '配置自定义提示设置。',
        placeholder: '占位符',
        unsaved: '未保存',
        saved: '已保存'
      },
      sectionTitle: '节标题',
      sectionDescription: '节描述'
    },
    computerUse: {
      loadError: '加载错误',
      openedSettings: '已打开设置',
      macosOnly: '仅 macOS',
      openError: '打开错误',
      copySuccess: '复制成功',
      copyError: '复制错误',
      header: '标题',
      subtitle: '副标题',
      unavailableReason: '不可用原因',
      opening: '打开中',
      open: 'Open',
      installSkill: {
        title: '安装技能',
        description: '安装计算机自动化技能。'
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
      loadError: '加载错误',
      permissionGranted: 'Permission Granted',
      openedSystemSettings: 'Opened System Settings',
      permissionRequestSent: 'Permission Request Sent',
      requestError: 'Request Error',
      header: '标题',
      subtitle: '副标题',
      working: 'Working'
    },
    experimental: {
      pet: {
        title: '宠物模式',
        description: '启用虚拟宠物伴侣。',
        label: '宠物模式',
        helper: '配置宠物模式设置。'
      },
      agentsView: {
        title: '代理视图',
        description: '启用实验性代理视图。',
        label: '代理视图',
        helper: '配置代理视图设置。'
      },
      symlinks: {
        title: '符号链接',
        description: '在文件资源管理器中启用符号链接支持。',
        label: '符号链接',
        helper: '配置符号链接设置。'
      }
    },
    git: {
      branchPrefix: {
        title: '分支前缀',
        description: '新分支名称的前缀。',
        gitUsername: 'Git Username',
        custom: '自定义',
        none: 'None'
      },
      refreshLocalBaseRef: {
        title: '刷新本地基引用',
        description: '自动刷新本地基引用。',
        label: '刷新本地基引用',
        helper: '配置刷新本地基引用设置。'
      },
      githubApiBudget: {
        title: 'GitHub API 预算',
        description: 'GitHub API 调用的速率限制预算。'
      },
      orcaAttribution: {
        title: 'Orca 署名',
        description: '在提交中添加 Orca 署名。',
        label: 'Orca 署名',
        helper: '配置Orca 署名设置。'
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
      title: 'MCP 服务器',
      description: '模型上下文协议服务器配置。',
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
      copyError: '复制错误',
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
      title: '稀疏检出预设',
      description: '管理用于稀疏工作树创建的已保存目录集。',
      loading: '正在加载稀疏预设...',
      empty: '该仓库尚未保存稀疏预设。',
      newPresetButton: '新建预设',
      newPresetTitle: '新建预设',
      editPresetTitle: '编辑预设',
      editorDescription: '保存的目录在为此仓库创建稀疏工作树时使用。',
      cancelEditAriaLabel: '取消预设编辑',
      nameLabel: '名称',
      namePlaceholder: '例如 web-only',
      nameRequired: '名称为必填项。',
      nameTooLong: '名称必须在 80 个字符以内。',
      nameExists: '"{{name}}" 已存在。',
      directoriesLabel: '目录',
      directoriesPlaceholder: 'packages/web\nshared/ui',
      directoryWillBeSaved: '将保存 1 个目录。',
      directoriesWillBeSaved: '将保存 {{count}} 个目录。',
      directoriesHint: '使用相对于仓库的路径，例如 packages/web 或 apps/api。',
      savePreset: '保存预设',
      directoryCountSingular: '1 个目录',
      directoryCountPlural: '{{count}} 个目录',
      updatedAt: '更新于 {{date}}',
      updatedDateUnknown: '更新时间未知',
      editAriaLabel: '编辑 {{name}}',
      deleteAriaLabel: '删除 {{name}}',
      moreDirectories: '+{{count}} 更多'
    },
    mobileNetwork: {
      title: '网络接口',
      description:
        '选择在二维码中广告的网络地址。使用局域网地址进行同网络配对，或使用覆盖网络地址（Tailscale、ZeroTier）进行跨网络访问。',
      noInterfaces: '未找到接口',
      refreshAriaLabel: '刷新网络接口',
      refreshTooltip: '刷新网络接口',
      generateQr: '生成二维码',
      regenerateQr: '重新生成',
      tailnetAccordionTitle: '通过 tailnet 在 Wi-Fi 外连接',
      tailnetDescription:
        'Orca Mobile 直接连接到此计算机。要在离开同一本地网络时使用，请将您的计算机和手机放在同一私有覆盖网络上，然后生成选择该网络地址的二维码。',
      tailnetStep1Prefix: '在您的计算机和手机上安装',
      tailnetStep1Suffix: '。',
      tailnetStep2: '在两个设备上登录到同一 tailnet。',
      tailnetStep3: '在此网络接口菜单中，选择 Tailscale 地址，通常是 100.x.y.z 的 IP。',
      tailnetStep4: '重新生成二维码并从 Orca 移动应用扫描。'
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
        title: '任务来源',
        description: '拉取任务的来源。'
      },
      taskProviders: {
        title: '任务提供方',
        description: '任务提供方集成。'
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
      targetsTitle: '目标',
      targetsDescription: '添加远程主机以在 Orca 中连接它。',
      import: '导入',
      addTarget: '添加目标',
      noTargetsConfigured: '未配置 SSH 目标。',
      editTargetTitle: '编辑 SSH 目标',
      newTargetTitle: '新建 SSH 目标',
      label: '标签',
      labelPlaceholder: '我的服务器',
      host: '主机',
      hostPlaceholder: '192.168.1.100 或 server.example.com',
      username: '用户名',
      usernamePlaceholder: 'deploy',
      port: '端口',
      portPlaceholder: '22',
      identityFile: '身份文件',
      identityFilePlaceholder: '~/.ssh/id_ed25519（留空以使用 SSH 代理）',
      identityFileDescription: '可选。默认使用 SSH 代理。',
      proxyCommand: '代理命令',
      proxyCommandPlaceholder: '例如 cloudflared access ssh --hostname %h',
      proxyCommandDescription: '可选。用于隧道（例如 Cloudflare Access、ProxyCommand）。',
      jumpHost: '跳板主机',
      jumpHostPlaceholder: 'bastion.example.com',
      jumpHostDescription: '可选。等效于 ProxyJump / ssh -J。',
      relayGracePeriod: '中继宽限期（秒）',
      relayGracePeriodDescription:
        '断开连接后中继保持终端运行的时间。默认值：10800（3 小时）。0 表示保持运行直到终端结束或中继被重置。',
      syncRemoteWorkspace: '同步远程工作区',
      syncRemoteWorkspaceDescription:
        '在 SSH 主机上存储终端标签页和分屏布局，以便其他 Orca 客户端可以恢复相同的远程工作区。',
      syncedRelayGracePeriod: '同步中继宽限期（秒）',
      syncedRelayGracePeriodDescription:
        '同步的远程工作区终端在所有客户端断开连接后保持运行的时间。0 表示保持运行直到显式终止。',
      saveChanges: '保存更改',
      connect: '连接',
      disconnect: '断开连接',
      edit: '编辑',
      remove: '移除',
      test: '测试',
      connecting: '连接中',
      endRemoteTerminals: '结束远程终端',
      resetRemoteRelay: '重置远程中继',
      dialog: {
        removeTitle: '移除 SSH 目标',
        removeDescription: '这将移除目标并结束所有活动的远程终端。',
        removeAction: '移除',
        removeBusy: '移除中',
        resetTitle: '重置远程中继？',
        resetDescription:
          '这将强制停止此 SSH 目标的远程中继。此目标的活动远程终端和端口转发将会结束。',
        resetAction: '重置中继',
        resetBusy: '重置中',
        terminateTitle: '结束远程终端？',
        terminateDescription: '这将停止此 SSH 目标上的活动终端会话。重新连接不会恢复它们。',
        terminateAction: '结束终端',
        terminateBusy: '结束中'
      },
      status: {
        disconnected: '已断开连接',
        connecting: '连接中…',
        authFailed: '认证失败',
        deployingRelay: '部署中继中…',
        connected: '已连接',
        reconnecting: '重新连接中…',
        reconnectionFailed: '重新连接失败',
        error: '错误'
      },
      toast: {
        loadFailed: '加载 SSH 目标失败',
        hostAndUsernameRequired: '主机和用户名是必填项',
        portInvalid: '端口必须在 1 到 65535 之间',
        relayGracePeriodInvalid: '中继宽限期必须为 0 或在 60 到 10800 秒之间',
        syncedRelayGracePeriodInvalid: '同步中继宽限期必须在 0 到 10800 秒之间',
        targetUpdated: '目标已更新',
        targetAdded: '目标已添加',
        saveFailed: '保存目标失败',
        targetRemoved: '目标已移除',
        removeFailed: '移除目标失败',
        connectionFailed: '连接失败',
        disconnectFailed: '断开连接失败',
        remoteTerminalsEnded: '远程终端已结束',
        endRemoteTerminalsFailed: '结束远程终端失败',
        remoteRelayReset: '远程中继已重置',
        resetRelayFailed: '重置远程中继失败',
        connectionSuccessful: '连接成功',
        connectionTestFailed: '连接测试失败',
        testFailed: '测试失败',
        noNewHosts: '在 ~/.ssh/config 中未找到新主机',
        importedHost: '已导入 {{count}} 个主机',
        importedHosts: '已导入 {{count}} 个主机',
        importFailed: '导入失败'
      },
      aria: {
        endingRemoteTerminals: '正在结束远程终端',
        endRemoteTerminals: '结束远程终端',
        resettingRemoteRelay: '正在重置远程中继',
        resetRemoteRelay: '重置远程中继',
        editTarget: '编辑目标',
        removingTarget: '正在移除目标',
        removeTarget: '移除目标'
      }
    },
    accounts: {
      systemDefault: '系统默认',
      active: '使用中',
      addAccount: '添加账户',
      accountsLabel: '账户',
      reauthenticate: '重新验证',
      remove: '移除',
      removeAccount: '移除账户',
      claude: {
        title: 'Claude 账户',
        description: '可选的 Claude 账户切换，保留共享聊天上下文。',
        headerDescription:
          '可选。Orca 可以使用您正常的 Claude 登录；仅当您希望快速切换而不移动聊天会话时才添加账户。',
        accountDescription: 'Orca 仅切换 Claude 认证；配置和聊天记录保留在共享的 Claude 根目录中。',
        systemDefaultDescription: '使用您当前的系统 Claude 登录。',
        noAccounts:
          '尚无受管理的 Claude 账户。Orca 将使用您的系统默认 Claude 登录，直到您在此处添加一个。',
        removeDialog: {
          title: '移除 Claude 账户？',
          description:
            'Orca 将删除此保存账户的受管理 Claude 认证。如果它当前处于使用中，Orca 将回退到系统默认 Claude 登录。'
        }
      },
      codex: {
        title: 'Codex 账户',
        description: '管理 Orca 用于实时速率限制获取的 Codex 账户。',
        headerDescription1:
          '可选。Orca 可以使用您正常的 Codex 登录；仅当您希望在 Orca 中快速切换时才添加账户。',
        headerDescription2: '每个账户在 Orca 中保留自己的本地登录上下文。账户认证保留在此设备上。',
        accountDescription: '添加 Codex 账户以在 Orca 中使用。',
        systemDefaultDescription: '使用您当前的系统 Codex 登录。',
        noAccounts:
          '尚无受管理的 Codex 账户。Orca 将使用您的系统默认 Codex 登录，直到您在此处添加一个。',
        removeDialog: {
          title: '移除 Codex 账户？',
          description:
            'Orca 将删除此保存账户的受管理 Codex 主目录。如果它当前处于使用中，Orca 将回退到系统默认 Codex 登录。'
        }
      },
      gemini: {
        headerDescription: '配置 Gemini 提供商设置。',
        useCliCredentials: {
          title: '使用 Gemini CLI 凭证',
          description:
            '从本地 Gemini CLI 安装中提取 OAuth 凭证以向 Google 进行身份验证。这使用的是发给 Gemini CLI 应用的凭证，而非 Orca。如果 Google 更新 CLI，可能会失效。请自行承担风险。',
          label: '使用 Gemini CLI 凭证（实验性）',
          helperText:
            '从本地 Gemini CLI 安装中提取 OAuth 凭证以向 Google 进行身份验证。这使用的是发给 Gemini CLI 应用的凭证，而非 Orca。如果 Google 更新 CLI，可能会失效。请自行承担风险。'
        }
      },
      opencodeGo: {
        headerDescription: '配置 OpenCode Go 提供商设置。',
        sessionCookie: {
          title: 'OpenCode Go 会话 Cookie',
          description: '粘贴您的 opencode.ai 会话 Cookie 以进行速率限制获取。',
          label: 'OpenCode Go 会话 Cookie',
          placeholder: 'Fe26.2**… token 或 auth=Fe26.2**… header',
          helperText:
            '粘贴原始 token 值（例如 {{tokenExample}}）或完整的 Cookie header（例如 {{headerExample}}）。在浏览器开发者工具 → 网络 → 任意 opencode.ai 请求 → Cookie header 中找到它。',
          clear: '清除'
        },
        workspaceId: {
          title: 'OpenCode Go 工作区 ID',
          description: '如果自动查找失败，可选的工作区 ID 覆盖。',
          label: '工作区 ID 覆盖',
          placeholder: 'wrk_…（留空以自动查找）',
          helperText: '登录 opencode.ai 后，在 URL 中找到此信息（例如 {{exampleUrl}}）。',
          clear: '清除'
        }
      },
      toasts: {
        loadCodexAccountsError: '无法加载 Codex 账户。',
        loadClaudeAccountsError: '无法加载 Claude 账户。',
        codexUpdateError: 'Codex 账户更新失败。',
        claudeUpdateSuccess: 'Claude 账户已更新。',
        claudeUpdateSuccessDescription:
          '{{previous}} → {{next}}。在继续旧会话之前，请重启实时的 Claude 终端。',
        claudeUpdateError: 'Claude 账户更新失败。'
      },
      errors: {
        codexSignInTimeout: 'Codex 登录耗时过长。请重试。',
        codexSignInUnavailable: 'Codex 登录暂时不可用。请稍后再试。',
        codexSignInFailed: 'Codex 登录失败。请重试。',
        claudeSignInFailed: 'Claude 登录失败。请重试。'
      }
    },
    runtimeEnvironments: {
      activeServer: {
        title: '活动服务器',
        description: '选择本地桌面、添加已保存的远程 Orca 服务器，或生成配对 URL。',
        label: '活动服务器',
        localDescription:
          '本地保持当前的桌面行为。已保存的服务器会将支持的客户端调用路由到远程运行时。',
        webDescription: '已保存的服务器会将此浏览器路由到配对的 Orca 运行时。'
      },
      localDesktop: '本地桌面',
      noServerConnected: '未连接服务器',
      refreshServers: '刷新服务器',
      savedServers: '已保存的服务器',
      addServer: '添加服务器',
      serverName: '服务器名称',
      serverNamePlaceholder: '开发机',
      pairingCode: '配对码',
      pairingCodePlaceholder: 'orca://pair#...',
      pairingCodeHelp1: '在服务器上运行',
      pairingCodeHelp2: '并粘贴打印的配对 URL。',
      noSavedServers: '没有已保存的服务器。',
      noEndpoint: '无端点',
      removeServerAriaLabel: '移除 {{name}}',
      shareServer: {
        title: '分享此 Orca 服务器',
        description: '创建可撤销的访问授权，以便浏览器或其他 Orca 客户端可以连接。',
        hideForm: '隐藏表单',
        newLink: '新建链接'
      },
      switchServer: {
        title: '切换服务器',
        description:
          'Orca 将关闭来自当前服务器的远程终端和浏览器标签页，然后加载来自下一个服务器的项目。',
        switchTo: '切换到',
        switch: '切换'
      },
      removeServer: {
        title: '移除服务器',
        activeLocalDescription:
          '移除活动服务器会首先将 Orca 切换回本地桌面，并关闭该服务器的远程终端和浏览器标签页。',
        activeWebDescription:
          '移除活动服务器会断开此浏览器的连接，并关闭该服务器的远程终端和浏览器标签页。',
        inactiveDescription: '这将从 Orca 中移除已保存的服务器。它不会更改活动服务器。',
        remove: '移除'
      },
      toasts: {
        loadError: '加载运行时环境失败。',
        nameAndCodeRequired: '名称和配对码为必填项。',
        duplicateName: '已存在名为 "{{name}}" 的服务器。',
        connectedTo: '已连接到 {{name}}。',
        saved: '已保存 {{name}}。准备好后，请使用“活动服务器”进行切换。',
        saveError: '保存运行时环境失败。',
        switchToLocalError: '无法切换到本地桌面。请修复问题后重试。',
        disconnectError: '无法从此服务器断开连接。请修复问题后重试。',
        removed: '已移除 {{name}}。',
        removeError: '移除运行时环境失败。',
        switchServersError: '无法切换服务器。请修复问题后重试。',
        switchError: '切换服务器失败。',
        switchedTo: '已切换到 {{name}}。'
      },
      errors: {
        switchServers: '无法切换服务器。请修复问题后重试。',
        switchFailed: '切换服务器失败。'
      },
      remoteServerFallback: '远程服务器'
    },
    cli: {
      title: 'Orca CLI',
      description: '通过终端使用 Orca 打开应用、管理工作区和与 Orca 终端交互。',
      revealLabelDarwin: '在 Finder 中显示',
      revealLabelWin32: '在资源管理器中显示',
      revealLabelDefault: '在文件管理器中显示',
      installDescriptionDarwin: '在 /usr/local/bin 中注册 `orca`。',
      installDescriptionLinux: '在 ~/.local/bin 中注册 `orca`。',
      installDescriptionWin32: '在用户 PATH 中注册 `orca`。',
      installDescriptionUnsupported: '此平台暂不支持 CLI 注册。',
      shellCommandLabel: 'Shell 命令',
      checkingStatus: '正在检查 CLI 注册状态…',
      refreshAriaLabel: '刷新 CLI 状态',
      refreshTooltip: '刷新',
      commandPathLabel: '命令路径：',
      existingLauncherTarget: '现有启动器目标：',
      pathNotVisible: '{{path}} 在当前 shell 的 PATH 中不可见。',
      agentSkillsLabel: '智能体技能',
      agentSkillsDescription: '安装技能，让智能体学会使用 Orca 并汇报状态。',
      cliSkillLabel: 'CLI 技能',
      copySkillInstallCommandAriaLabel: '复制 CLI 技能安装命令',
      copyTooltip: '复制',
      toast: {
        loadStatusFailed: '加载 CLI 状态失败。',
        registered: '已在 PATH 中注册 `orca`。',
        registerFailed: '在 PATH 中注册 `orca` 失败。',
        removed: '已从 PATH 中移除 `orca`。',
        removeFailed: '从 PATH 中移除 `orca` 失败。',
        copySkillCommandSuccess: '已复制技能安装命令。',
        copySkillCommandFailed: '复制安装命令失败。'
      },
      dialog: {
        removeTitle: '从 PATH 中移除 `orca`？',
        registerTitle: '在 PATH 中注册 `orca`？',
        removeDescription: '这将移除 shell 命令的符号链接，Orca 本身仍保持安装状态。',
        registerDescription: 'Orca 将注册 {{commandPath}}，以便在终端中使用该命令。',
        targetPathLabel: '目标路径：',
        removing: '正在移除…',
        registering: '正在注册…',
        remove: '移除',
        register: '注册'
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
      tasks: '任务',
      automations: '自动化',
      agents: '智能体',
      search: '搜索',
      searchAriaLabel: '搜索工作树和浏览器标签页',
      searchShortcut: 'Ctrl+Shift+J',
      openGitHubTasks: '打开 GitHub 任务',
      openGitLabTasks: '打开 GitLab 任务',
      openLinearTasks: '打开 Linear 任务'
    },
    filter: {
      filterWorkspaces: '筛选工作区',
      editFilters: '编辑筛选器',
      editFiltersActive: '编辑筛选器（{{count}} 个生效）',
      activeOnly: '仅活跃',
      hideDefaultBranch: '隐藏默认分支',
      repositories: '仓库',
      selectAll: '全选',
      clear: '清除',
      searchReposPlaceholder: '搜索仓库...',
      noReposMatch: '没有匹配的仓库',
      ssh: 'SSH',
      resetFilters: '重置筛选器',
      addRepo: '添加仓库'
    },
    openIn: {
      openIn: '打开方式',
      pathNotAbsolute: '工作区路径不是有效的本地路径。',
      folderNotFound: '未找到工作区文件夹。',
      folderNotFoundDescription: '它可能已被移动或删除。请刷新工作区或将其从 Orca 中移除。',
      openFailed: '无法打开工作区文件夹。',
      openFailedDescription: '请检查此机器上的编辑器命令或文件管理器配置。'
    },
    remoteFileBrowser: {
      placeholder: '输入以筛选或输入路径…',
      emptyDirectory: '空目录',
      emptyPreview: '{{path}} 为空',
      noMatches: "没有匹配 '{{filter}}' 的结果",
      fileHint: '文件不能作为项目打开',
      footer: '将作为远程项目打开 · {{path}}',
      selectFolder: '选择文件夹'
    },
    deleteWorktree: {
      title: '删除工作树',
      titleBatch: '删除多个工作树',
      description: '从 git 移除 {{name}} 并删除其工作树文件夹。',
      descriptionBatch: '从 git 移除 {{count}} 个工作树并删除其工作树文件夹。',
      mainWorktreeWarning: '主工作树无法删除。请改为移除仓库。',
      dontAskAgain: '不再询问',
      forceDelete: '强制删除',
      forceDeleting: '强制删除中…',
      deleting: '删除中…',
      cancel: '取消',
      dontAskAgainToast: '下次将跳过此确认。',
      dontAskAgainDescription: '您可以在设置中更改此选项。',
      openSettings: '打开设置',
      forceDeleteFailed: '强制删除失败',
      deleteFailed: '删除工作树失败'
    },
    removeFolder: {
      title: '移除项目',
      description: '这只会从 Orca 中移除 {{name}}。它仍保留在您的磁盘上。',
      cancel: '取消',
      remove: '移除'
    },
    nonGitFolder: {
      title: '作为文件夹打开',
      description:
        '此文件夹不是 Git 仓库。您可以使用编辑器、终端和搜索，但基于 Git 的功能将不可用。',
      cancel: '取消',
      open: '作为文件夹打开',
      addFailed: '添加远程文件夹失败'
    },
    orcaYamlTrust: {
      changedTitle: '{{repoName}} 的 {{scriptKind}} 已更改 — 运行新版本？',
      newTitle: '运行来自 {{repoName}} 的 {{scriptKind}}？',
      changedDescription: '自您上次批准以来 orca.yaml 已更改。在运行 {{trigger}} 之前请重新审查。',
      newDescription:
        '此仓库的 orca.yaml 在 {{trigger}} 时在您的机器上运行。只有信任 {{repoName}} 时才运行。',
      scriptLabels: {
        setup: '设置脚本',
        archive: '归档脚本',
        issueCommand: '问题命令'
      },
      triggers: {
        setup: '创建此工作区时',
        archive: '移除此工作区时',
        issueCommand: '此工作区带有关联问题启动时'
      },
      alwaysTrust: '始终信任 {{repoName}} 中的 orca.yaml',
      dontRun: '不运行',
      runHooks: '运行钩子',
      newScript: '新 {{scriptKind}} 脚本',
      script: '{{scriptKind}} 脚本'
    },
    sshDisconnected: {
      titleReconnecting: '重新连接中…',
      titleDisconnected: 'SSH 断开连接',
      statusMessages: {
        disconnected: '此远程仓库未连接。',
        reconnecting: '正在重新连接到远程主机...',
        reconnectionFailed: '重新连接到远程主机失败。',
        error: '与远程主机的连接遇到错误。',
        authFailed: '远程主机身份验证失败。'
      },
      reconnectingMessage: '正在重新连接到远程主机...',
      dismiss: '关闭',
      reconnect: '重新连接',
      connecting: '连接中...',
      reconnectionFailed: '重新连接失败'
    },
    toolbar: {
      addProject: '添加项目',
      addProjectTooltip: '打开文件夹选择器添加项目',
      toolboxAriaLabel: '工具箱',
      toolboxTooltip: '工具箱',
      orcaMobile: 'Orca 移动端',
      skills: '技能',
      spaceAnalyzer: '空间分析器',
      helpAriaLabel: '帮助',
      helpTooltip: '帮助',
      showOnboarding: '显示引导',
      sendFeedback: '发送反馈',
      docs: '文档',
      settingsTooltip: '设置',
      feedback: {
        title: '发送反馈',
        description: '分享哪些功能正常、哪些有问题，或希望 Orca 新增的功能。',
        otherWays: '其他联系方式',
        githubIssues: 'GitHub issues',
        joinDiscord: '加入 Discord',
        followOnX: '在 X 上关注',
        placeholder: '有哪些可以改进的地方？',
        githubLabel: 'GitHub:',
        submitAnonymously: '匿名提交',
        checkingIdentity: '正在检查 GitHub 身份…',
        submitOnlyHint: '仅提交您输入的反馈，或连接 `gh` 以包含 GitHub 身份。',
        send: '发送',
        sending: '发送中…',
        toast: {
          enterFeedback: '提交前请输入反馈内容。',
          thanks: '感谢您的反馈。',
          submitFailed: '提交反馈失败，请重试。'
        }
      }
    },
    header: {
      workspaces: '工作区',
      workspaceBoardAriaLabel: '工作区面板',
      closeWorkspaceBoard: '关闭工作区面板',
      workspaceBoard: '工作区面板',
      viewOptionsAriaLabel: '视图选项',
      viewOptionsTooltip: '视图选项',
      groupBy: '分组方式',
      groupByOptions: {
        none: '无',
        status: '状态',
        pr: 'PR',
        repo: '仓库'
      },
      sortBy: '排序方式',
      sortByOptions: {
        name: '名称',
        smart: '智能',
        recent: '最近',
        repo: '仓库',
        smartDescription: '需要关注的代理优先，然后按最近活动排序。'
      },
      showProperties: '显示属性',
      propertyOptions: {
        agentActivity: '代理活动'
      },
      newWorkspaceAriaLabel: '新建工作区',
      newWorkspaceTooltip: '新建工作区（{{shortcut}}）',
      newWorkspaceDisabledTooltip: '添加 Git 项目以创建工作区'
    },
    addRepo: {
      remote: {
        browseTitle: '浏览远程文件系统',
        browseDescription: '导航到目录并点击选择以选中它。',
        title: '打开远程项目',
        description: '选择已连接的 SSH 目标并输入 Git 仓库的路径。',
        sshTargetLabel: 'SSH 目标',
        noSshTargets: '未配置 SSH 目标。',
        addInSettings: '在设置中添加',
        remotePathLabel: '远程路径',
        remotePathPlaceholder: '/home/user/project',
        adding: '添加中...',
        addButton: '添加远程项目',
        connectionFailed: '连接失败',
        success: '远程项目已添加'
      },
      clone: {
        title: '从 URL 克隆',
        description: '输入 Git URL 并选择克隆位置。',
        gitUrlLabel: 'Git URL',
        gitUrlPlaceholder: 'https://github.com/user/repo.git',
        cloneLocationLabel: '克隆位置',
        cloneLocationPlaceholder: '/path/to/destination',
        chooseFolder: '选择文件夹',
        enterServerPath: '手动输入服务器路径',
        cloning: '克隆中...',
        cloneButton: '克隆'
      }
    },
    worktreeCard: {
      deleting: '删除中…',
      markRead: '标记为已读',
      markUnread: '标记为未读',
      markAsRead: '标记为已读',
      markAsUnread: '标记为未读',
      sshDisconnected: 'SSH 已断开',
      sshRemote: '通过 SSH 的远程仓库',
      unreadPrefix: '未读：',
      primaryBadge: '主工作树',
      primaryTooltip: '主工作树（原始克隆目录）',
      sparseBadge: '稀疏',
      sparseTooltip: '部分检出。这些路径之外的文件不在磁盘上。',
      sparseMore: '+{{count}} 更多',
      issueDetailsUnavailable: '问题详情不可用',
      loadingIssue: '正在加载问题...',
      linearIssueDetailsUnavailable: 'Linear 问题详情不可用',
      loadingLinearIssue: '正在加载 Linear 问题...',
      folderBadge: '文件夹',
      missingParent: '缺少父级',
      fromParent: '来自 {{parent}}',
      remoteBranchConflict: '{{remote}}/{{branchName}} 已存在。',
      childWorkspaceSingular: '{{count}} 个子工作区',
      childWorkspacePlural: '{{count}} 个子工作区',
      childShortSingular: '{{count}} 个子项',
      childShortPlural: '{{count}} 个子项',
      show: '显示',
      hide: '隐藏',
      showChildWorkspaces: '显示子工作区',
      hideChildWorkspaces: '隐藏子工作区'
    },
    contextMenu: {
      copyPath: '复制路径',
      pin: '固定',
      unpin: '取消固定',
      markRead: '标记为已读',
      markUnread: '标记为未读',
      openParentWorkspace: '打开父工作区',
      removeFromParent: '从父级移除',
      moveStatusesTo: '批量移动状态至',
      moveToStatus: '移动至状态',
      update: '更新',
      sleepTooltipSingle: '关闭此工作区中的所有活动面板以释放内存和 CPU。',
      sleepTooltipMulti: '关闭所选工作区中的所有活动面板以释放内存和 CPU。',
      sleep: '休眠',
      sleepWorkspaceSingular: '休眠 {{count}} 个工作区',
      sleepWorkspacePlural: '休眠 {{count}} 个工作区',
      deleteSelected: '删除所选',
      deleteWorkspaceSingular: '删除 {{count}} 个工作区',
      deleteWorkspacePlural: '删除 {{count}} 个工作区',
      mainWorktreeCannotDelete: '主工作树无法删除',
      deleting: '删除中…',
      removeFolderFromOrca: '从 Orca 中移除文件夹',
      delete: '删除'
    }
  },
  browser: {
    homePage: {
      label: '主页',
      description: '内置浏览器的默认主页。',
      save: '保存',
      placeholder: '占位符'
    },
    searchEngine: {
      label: '搜索引擎',
      description: '内置浏览器的默认搜索引擎。'
    },
    linkRouting: {
      label: '链接路由',
      description: '如何处理外部链接点击。'
    },
    sessionCookies: {
      label: '会话 Cookie',
      description: '如何管理会话 Cookie。',
      addProfile: '添加配置文件',
      newProfileTitle: '新建配置文件',
      profilePlaceholder: '输入配置文件名称',
      creating: '正在创建…',
      create: '创建',
      profileCreated: '已成功创建配置文件 "{{label}}"',
      profileCreateFailed: '创建配置文件失败。',
      active: '使用中',
      noCookiesImported: '未导入任何 cookie',
      importCookies: '导入 Cookie',
      fromBrowser: '从 {{browser}} 导入',
      fromFile: '从文件导入…',
      importFromBrowserSuccess: '已成功从 {{browser}} 导入 {{count}} 个 cookie 到 {{profile}}。',
      importFromFileSuccess: '已从文件成功导入 {{count}} 个 cookie 到 {{profile}}。',
      defaultCookiesCleared: '默认 cookie 已清除。',
      profileRemoved: '配置文件 "{{label}}" 已移除。'
    }
  },
  notifications: {
    enable: '启用',
    enableDescription: '启用说明',
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
      chooseRunLocationAndPrompt: '选择运行位置并输入提示词。',
      pickSupportedSchedule: '选择支持的调度类型。',
      enterValidCron: '输入有效的 cron 表达式。',
      chooseAvailableWorkspace: '选择可用的工作区。',
      chooseSameHostWorkspace: '选择与该 Hermes cron 同一主机的工作区。',
      hermesCronUpdated: 'Hermes cron 已更新。',
      hermesCronCreated: 'Hermes cron 已创建。',
      automationUpdated: '自动化已更新。',
      automationSaved: '自动化已保存。',
      saveFailed: '保存自动化失败。',
      skipConfirmationNextTime: '下次将跳过此确认。',
      runQueued: '运行已排队。',
      runSubmitted: '自动化运行已提交。ID: {{runId}} — 在任务页面查看状态。',
      externalActionFailed: '外部操作失败。',
      sshUnavailable: 'SSH 连接不可用。',
      sshConnected: 'SSH 已连接。',
      sshFailed: 'SSH 连接失败。',
      workspaceUnavailable: '工作区不可用。',
      skipConfirmDescription: '您可以在设置中更改此项。',
      openSettings: '打开设置',
      externalAutomationDeleted: '外部自动化已删除。',
      externalAutomationQueued: '外部自动化已排队。',
      externalAutomationPaused: '外部自动化已暂停。',
      externalAutomationResumed: '外部自动化已恢复。'
    },
    title: '自动化',
    closeAutomationsAria: '关闭自动化',
    closeAutomationsTooltip: '关闭 · Esc',
    addAutomationAria: '添加自动化',
    addAutomationTooltip: '添加自动化',
    refreshAutomationsAria: '刷新自动化',
    refreshAutomationsTooltip: '刷新自动化',
    automationHeader: '自动化',
    nextHeader: '下次',
    deleteAutomationTitle: '删除自动化',
    andItsRunHistory: '及其运行历史。由之前运行创建的工作区不会被删除。',
    newWorkspaceEachRun: '每次运行使用新工作区',
    selectedWorkspace: '选定的工作区',
    dontAskAgain: '不再询问',
    deleteExternalAutomationTitle: '删除外部自动化',
    from: '来自',
    externalSource: '外部源',
    on: '在',
    connectToLoadJobs: '连接以加载任务',
    unavailable: '不可用',
    sourceUnavailable: '{{provider}} 源不可用，直到连接了 {{targetKind}}。',
    unknownProject: '未知项目',
    missingWorkspace: '缺失工作区',
    usageUnavailable: '使用情况不可用',
    noRunUsageYet: '暂无运行使用情况',
    paused: '已暂停',
    createFromBranch: '从 {{branch}} 创建',
    projectDefault: '项目默认值',
    usageText: '预估 {{cost}} · {{tokens}} 字符',
    run_one: '次运行',
    run_other: '次运行',
    manageable: '可管理',
    readOnly: '只读',
    connectSsh: '连接 SSH',
    connecting: '正在连接…',
    overviewTab: '概览',
    runsTab: '运行记录',
    orca: 'Orca',
    noWorkspace: '无工作区',
    latestSavedOutput: '最新保存的输出',
    selectAutomationToViewRuns: '选择一个自动化以查看其运行记录。',
    startFromTemplate: '从模板开始',
    addNew: '添加新自动化',
    runNow: '立即运行',
    edit: '编辑',
    pause: '暂停',
    resume: '恢复',
    unsupportedSchedule: '此自动化包含不受支持的保存日程。在保存更改前请先选择一个受支持的日程。',
    unsupportedHermesSchedule:
      '此 Hermes cron 包含不受支持的保存日程。在保存更改前请先选择一个受支持的日程。',
    never: '从未',
    statusCompleted: '已完成',
    statusFailed: '失败',
    statusUnknown: '未知',
    targetKindLocal: '本地',
    targetKindRemoteSsh: '远程 SSH',
    noOutputContent: '无可用输出内容。',
    editor: {
      editAutomation: '编辑自动化',
      createHermesCron: '创建 Hermes 定时任务',
      createAutomation: '创建自动化',
      namePlaceholder: '工作日仓库审计',
      nameAriaLabel: '自动化名称',
      useTemplate: '使用模板',
      promptLabel: '提示词',
      promptPlaceholder: '运行每周依赖审计并总结有风险的更改。',
      projectLabel: '项目',
      selectProjectPlaceholder: '选择项目',
      workspaceLabel: '工作区',
      startBranchLabel: '起始分支',
      modeWorktree: '当前工作区',
      modeNewRun: '新运行',
      agentLabel: '智能体',
      scheduleLabel: '调度安排',
      graceLabel: '容错窗口',
      graceHelpAriaLabel: '错过运行的容错帮助',
      graceHelpTooltip:
        '如果 Orca 或执行主机在预定时间不可用，Orca 将在容错窗口内恢复时重新执行一次错过的运行。更早的错过运行将被跳过。',
      noGrace: '无容错窗口',
      minutes30: '30 分钟',
      hour1: '1 小时',
      hours3: '3 小时',
      hours12: '12 小时',
      hours24: '24 小时',
      hours48: '48 小时',
      cancel: '取消',
      saveChanges: '保存更改',
      save: '保存',
      create: '创建',
      selectWorkspace: '选择工作区',
      searchWorkspaces: '搜索工作区...',
      noWorkspacesFound: '未找到工作区。',
      branchFrom: '起始分支',
      projectDefault: '项目默认值',
      searchRepoBranches: '搜索项目分支...',
      searchingBranches: '正在搜索分支...',
      noBranchesFound: '未找到分支。',
      defaultSuffix: '(默认)',
      customCron: '自定义 Cron',
      hourly: '每小时',
      daily: '每天',
      weekdays: '工作日',
      weekly: '每周',
      useCustomCron: '使用自定义 Cron',
      cronStringLabel: 'Cron 表达式',
      cronStringHelp: '包含五个字段：分 时 日 月 周',
      cronStringError: '请输入有效的 5 字段 Cron 表达式。',
      dayLabel: '日期',
      minuteLabel: '分钟',
      timeLabel: '时间',
      sunday: '星期日',
      monday: '星期一',
      tuesday: '星期二',
      wednesday: '星期三',
      thursday: '星期四',
      friday: '星期五',
      saturday: '星期六'
    }
  },
  linear: {
    toast: {
      copied: '{{label}} 已复制',
      copyFailed: '复制 {{label}} 失败',
      loadSubIssueFailed: '加载子问题失败',
      created: '已创建 {{identifier}}',
      createSubIssueFailed: '创建子问题失败',
      loadProjectsFailed: '加载项目失败',
      projectUpdated: '项目已更新',
      updateProjectFailed: '更新项目失败',
      loadCommentsFailed: 'Failed to load comments.'
    },
    copyLabels: {
      url: 'URL',
      identifier: '标识符',
      suggestedBranchName: '建议分支名',
      prompt: '提示词'
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
      merged: '已合并',
      draft: '草稿',
      closed: '已关闭',
      open: '开放'
    },
    mergeTooltip: {
      notLoaded: '合并状态尚未加载',
      alreadyMerged: '此拉取请求已合并',
      closed: '此拉取请求已关闭',
      conflicting: 'GitHub 报告存在合并冲突',
      behind: '合并前请先更新分支',
      blocked: 'GitHub 报告此拉取请求被阻止',
      canMerge: 'GitHub 表示此 PR 可以合并',
      unknown: 'GitHub 尚未报告最终合并状态'
    },
    mention: {
      prAuthor: 'PR 作者',
      issueAuthor: 'Issue 作者',
      commenter: '评论者',
      participant: '参与者',
      teamMember: '团队成员'
    },
    diff: {
      failedToLoad: '加载 diff 失败',
      binaryFile: '二进制文件 — 不显示 diff。',
      unavailable: 'Diff 不可用（缺少提交 SHA）。'
    },
    codeContext: {
      showBlock: '显示周围代码块',
      showNearby: '显示附近代码上下文',
      loading: '加载代码上下文…'
    },
    reply: {
      inThread: '在此评审线程中回复',
      toAuthor: '回复 @{{author}}',
      posting: '发送中…',
      reply: '回复',
      cancel: '取消'
    },
    merge: {
      squashAndMerge: '压缩并合并',
      rebaseAndMerge: '变基并合并',
      merge: '合并',
      closePR: '关闭 PR',
      reopenPR: '重新打开 PR',
      requiresRepo: '合并需要已注册的本地仓库',
      openGitHubMergeBox: '在 GitHub 上打开合并框',
      confirmTitle: '{{method}} PR #{{number}}？'
    },
    folder: {
      collapse: '收起',
      expand: '展开'
    },
    viewed: {
      unmark: '取消标记',
      mark: '标记',
      unmarkViewed: '取消标记为已查看',
      markViewed: '标记为已查看',
      viewed: '已查看',
      markAsViewed: '{{action}} {{file}} 为已查看'
    },
    sheet: {
      fallbackTitle: 'GitHub 项目',
      description: '所选 GitHub Issue 或拉取请求的只读预览。',
      pullRequest: '拉取请求',
      issue: 'Issue',
      unknown: '未知',
      updated: '更新于',
      copyLink: '复制 GitHub 链接',
      copied: '已复制',
      openOnGitHub: '在 GitHub 上打开'
    },
    tabs: {
      conversation: '对话',
      files: '文件',
      checks: '检查'
    },
    startWorkspace: {
      fromPR: '从 PR 启动工作区',
      fromIssue: '从 Issue 启动工作区'
    },
    errors: {
      noRepoForEdit: '此编辑没有可用的仓库上下文。',
      noRepoForPR: '此拉取请求没有可用的仓库上下文。'
    },
    toast: {
      commentNoSha: '没有 PR head SHA 无法评论。',
      reviewCommentAdded: '评审评论已添加。',
      replyNoRepo: '没有仓库路径无法回复。',
      replyPosted: '回复已发布。',
      prClosed: '拉取请求已关闭',
      prReopened: '拉取请求已重新打开',
      prStateFailed: '{{action}} PR 失败',
      prMerged: '拉取请求已合并',
      mergeFailed: '合并拉取请求失败',
      checkRefreshFailed: '刷新检查失败',
      checkRerunFailed: '重新运行检查失败',
      checkRerunRequested: '已请求重新运行检查',
      checkRerunsRequested: '已请求重新运行检查',
      viewedStateSyncFailed: '与 GitHub 同步已查看状态失败。',
      linkCopied: 'GitHub 链接已复制',
      linkCopyFailed: '复制 GitHub 链接失败',
      commentFailed: '添加评论失败',
      replyFailed: '发布回复失败。'
    }
  },
  taskPage: {
    filter: {
      open: '开放',
      merged: '已合并',
      closed: '已关闭',
      all: '全部'
    },
    source: {
      github: 'GitHub',
      gitlab: 'GitLab',
      linear: 'Linear'
    },
    preset: {
      open: '开放',
      assignedToMe: '分配给我',
      mine: '我的',
      needsReview: '需要评审',
      myIssues: '我的 Issues',
      created: '已创建',
      completed: '已完成',
      issues: '开放',
      'my-issues': '分配给我',
      prs: '开放',
      'my-prs': '我的',
      review: '需要评审',
      all: '全部',
      assigned: '我的 Issues'
    },
    linearTab: {
      issues: 'Issues',
      projects: '项目'
    },
    priority: {
      none: '无',
      urgent: '紧急',
      high: '高',
      medium: '中',
      low: '低'
    },
    viewMode: {
      list: '列表',
      board: '看板'
    },
    groupBy: {
      none: '不分组',
      status: '状态',
      assignee: '负责人',
      priority: '优先级',
      team: '团队'
    },
    sortBy: {
      priority: '优先级',
      updated: '更新时间',
      identifier: '标识符'
    },
    boardProperty: {
      state: '状态',
      priority: '优先级',
      assignee: '负责人',
      team: '团队',
      labels: '标签',
      updated: '更新时间'
    },
    assignee: {
      unassigned: '未分配'
    },
    review: {
      requested: '已请求',
      reviewed: '已评审',
      noReviewersYet: '尚未请求评审人。',
      openDetailsToView: '打开 PR 详情以查看当前评审人。',
      noMatchingReviewers: '没有匹配的评审人。',
      reviewers: '评审人',
      approved: '已批准',
      changesRequested: '请求更改',
      requestedCount: '{{count}} 已请求',
      reviewedCount: '{{count}} 已评审',
      noReviewers: '无评审人'
    },
    checks: {
      checks: '检查',
      noChecks: '无检查',
      failing: '{{count}} 失败',
      pending: '{{count}} 进行中',
      passed: '{{passed}}/{{total}} 通过',
      openPRConversationAndChecks: '打开 PR 对话和检查'
    },
    merge: {
      confirmTitle: '{{method}} PR #{{number}}？',
      conflicts: '冲突',
      behind: '落后',
      blocked: '被阻止',
      ableToMerge: '可合并',
      unknown: '未知',
      checksPending: 'GitHub 表示此 PR 可以合并，但检查仍在运行中',
      checksPassed: 'GitHub 表示此 PR 可以合并且检查已通过'
    },
    errors: {
      loadLinearIssues: '加载 Linear issues 失败。',
      connectionFailed: '连接失败'
    },
    search: {
      prs: '搜索 GitHub PRs...',
      issues: '搜索 GitHub issues...',
      linear: '搜索 Linear issues...'
    },
    refresh: {
      gitlabWorkItems: '刷新 GitLab 工作项',
      myTodos: '刷新我的待办'
    },
    retry: '重试',
    gitlab: {
      noPendingTodos: '没有待办事项。你已经全部完成了！',
      selectRepoToAuth: '选择一个仓库以便我们可以认证到 GitLab。',
      noMatches: '没有符合此筛选条件的 GitLab 工作。',
      selectRepoToSee: '选择一个仓库以查看 GitLab 工作项。',
      mr: 'MR',
      issue: 'Issue',
      createsNewIssueInSelectedTeam: '在选中的团队中创建一个新 issue。',
      createsNewIssueInTeam: '在 {{workspace}}{{team}} 中创建一个新 issue。',
      yourTeam: '你的团队'
    },
    header: {
      id: 'ID',
      titleContext: '标题 / 上下文',
      branch: '分支',
      status: '状态',
      reviewers: '评审人',
      checks: '检查',
      merge: '合并',
      updated: '更新时间',
      action: '操作',
      title: '标题',
      project: '项目',
      typeState: '类型 / 状态',
      key: '键',
      issue: 'Issue',
      priority: '优先级',
      assignee: '负责人',
      team: '团队',
      linearIssues: 'Linear issues',
      shown: '显示 {{count}} 条'
    },
    empty: {
      noMatchingGitHubWork: '没有匹配的 GitHub 工作',
      changeQueryOrClear: '更改查询或清除它。',
      noLinearIssuesFound: '未找到 Linear issues',
      tryDifferentSearch: '尝试不同的搜索查询。',
      noAssignedIssues: '没有分配的 issues。尝试搜索一些内容。',
      noIssuesMatchTeams: '没有符合所选团队的 issues',
      selectMoreTeams: '尝试选择更多团队或点击"所有团队"。',
      noPendingTodos: '没有待办事项。你已经全部完成了！',
      selectRepoForGitLab: '选择一个仓库以便我们可以认证到 GitLab。',
      noGitLabWorkMatches: '没有符合此筛选条件的 GitLab 工作。',
      selectRepoToSeeGitLab: '选择一个仓库以查看 GitLab 工作项。'
    },
    label: {
      newGitHubIssue: '新建 GitHub issue',
      newLinearIssue: '新建 Linear issue',
      refreshGitHubWork: '刷新 GitHub 工作',
      refreshLinearIssues: '刷新 Linear issues',
      startWorkspace: '启动工作区',
      openInBrowser: '在浏览器中打开',
      view: '查看',
      creating: '创建中…',
      connect: '连接',
      verifying: '验证中…',
      cancel: '取消',
      createIssue: '创建 issue',
      previous: '上一页',
      next: '下一页',
      pagination: '分页',
      previousPage: '上一页',
      nextPage: '下一页',
      retry: '重试',
      retrying: '重试中…',
      linearViewMode: 'Linear 视图模式',
      grouping: '分组',
      ordering: '排序',
      displayProperties: '显示属性',
      issues: 'Issues',
      prs: 'PRs',
      project: '项目',
      connectLinearWorkspace: '连接 Linear 工作区'
    },
    toast: {
      linearStateUpdateFailed: '更新 Linear 状态失败',
      stateUpdateFailed: '更新状态失败',
      reviewerRequired: '输入评审人用户名',
      reviewerRequested: '已请求评审人',
      reviewerRequestFailed: '请求评审人失败',
      defaultTaskViewSaveFailed: '保存默认任务视图失败。',
      createIssueFailed: '创建 issue 失败。',
      workspaceSwitchFailed: '切换 Linear 工作区失败。',
      teamSelectionSaveFailed: '保存团队选择失败。',
      repoSelectionSaveFailed: '保存仓库选择失败。',
      loadGitHubWorkFailed: '加载 GitHub 工作失败。',
      upstreamNotConfigured: '来自 {{slug}} 的 issues',
      issueCreated: '已打开 issue #{{number}}',
      linearIssueCreated: '已创建 {{identifier}}'
    }
  },
  gitlabItem: {
    state: {
      opened: '开放',
      closed: '已关闭',
      merged: '已合并',
      locked: '已锁定',
      draft: '草稿',
      resolved: '已解决'
    },
    toast: {
      closedMR: '已关闭 MR !{{number}}',
      reopenedMR: '已重新打开 MR !{{number}}',
      mergedMR: '已合并 MR !{{number}}'
    },
    dialog: {
      fallbackTitle: 'GitLab 项目',
      description: 'GitLab 工作项详情',
      byAuthor: '由 {{author}} 创建',
      itemNotFound: '未找到该项。',
      tabs: {
        description: '描述',
        conversation: '对话',
        pipeline: '流水线'
      },
      empty: {
        noDescription: '暂无描述。',
        noComments: '暂无评论。',
        noPipelineRuns: '此 MR 暂无流水线运行。'
      },
      commentPlaceholder: '在 {{prefix}}{{number}} 上发表评论…',
      commentButton: '评论',
      openInBrowser: '在浏览器中打开',
      createWorkspace: '创建工作区',
      merge: '合并',
      close: '关闭',
      reopen: '重新打开'
    }
  },
  updatesCard: {
    dismiss: '忽略',
    checking: '正在检查更新…',
    upToDate: '已是最新版本。',
    reassuranceTip: '更新期间您的终端会话不会中断。',
    dismissTip: '忽略提示',
    newVersion: '新版本: {{title}}',
    dismissUpdate: '忽略更新',
    moreReleases: '自您上次更新以来已有 +{{count}} 个新版本',
    readNotes: '阅读完整发布说明',
    update: '更新',
    availableTitle: '有可用更新',
    readyVersion: 'Orca v{{version}} 已就绪。',
    noInterruption: '会话不会中断。',
    releaseNotes: '发布说明',
    downloadingTitle: '正在下载更新',
    minimize: '最小化到状态栏',
    downloadingVersion: '正在下载 Orca v{{version}}。',
    downloadingProgress: '正在下载… {{percent}}%',
    errorTitle: '更新错误',
    checkFailedTitle: '检查更新失败',
    completeFailed: '无法完成更新。',
    checkFailed: '无法检查更新。',
    retryDownload: '重试下载',
    recheck: '重新检查',
    tryAgain: '重试',
    downloadManually: '手动下载',
    readyToInstallTitle: '准备安装',
    downloadedRestart: 'Orca v{{version}} 已下载完成。准备好后请重启。',
    restartToUpdate: '重启以更新',
    installing: '正在安装…'
  },
  telemetryBanner: {
    ariaLabel: '遥测通知',
    title: '帮助我们决定下一步构建什么',
    description:
      '您使用哪些功能的匿名统计数据可以帮助我们确定开发的优先级。不会收集任何文件内容、提示词、终端输出或任何可以识别您身份的信息。您可以随时在“设置” → “隐私和遥测”中进行更改。',
    privacyPolicy: '隐私政策',
    optOut: '拒绝加入',
    gotIt: '知道了',
    dismissNotice: '关闭通知'
  },
  starNag: {
    heading: '喜欢 Orca 吗？',
    description:
      '如果 Orca 为您节省了时间，在 GitHub 上点亮一颗星星将对我们大有帮助。这不仅能让其他开发者发现这个项目，也会激励团队持续改进。',
    error: '无法点赞仓库。请确保 {{cli}} 已登录并重试。',
    starring: '点星中…',
    starOnGitHub: '在 GitHub 上点星',
    dismiss: '关闭'
  },
  jumpPalette: {
    noResultsTitle: '没有符合搜索条件的结果',
    noResultsSubtitle: '尝试输入名称、分支、仓库、说明、PR、页面标题或 URL。',
    noOtherWorktreesTitle: '没有其他可切换的工作区',
    noOtherWorktreesSubtitle: '输入内容以搜索或创建新的工作区。',
    noActiveTitle: '无活动工作区或浏览器标签页',
    noActiveSubtitle: '在 Orca 中创建工作区或打开页面以开始使用。',
    title: '跳转至...',
    description: '搜索工作区和浏览器标签页',
    inputPlaceholder: '跳转至工作区或浏览器标签页… 尝试输入 "repo/worktree"',
    loadingTitle: '正在加载跳转目标',
    loadingSubtitle: '正在收集您最近的工作区和打开的浏览器页面。',
    headerWorktrees: '工作区',
    headerRecentWorktrees: '最近的工作区',
    worktreeCapHint: '输入内容以查看全部 {{count}} 个工作区',
    headerBrowserTabs: '浏览器标签页',
    sshDisconnected: 'SSH 已断开',
    sshRemote: 'SSH 远程',
    currentBadge: '当前',
    primaryBadge: '主工作区',
    currentTabBadge: '当前标签页',
    currentWorktreeBadge: '当前工作区',
    createAction: '创建工作区 "{{name}}"',
    footerOpen: '打开',
    footerClose: '关闭',
    footerMove: '移动',
    ariaResultsFound: '找到 {{count}} 个结果',
    ariaItemsAvailable: '有 {{count}} 个可用项目',
    ariaCreateActionAvailable: '，有创建新工作区操作可用',
    worktreeNoLongerExists: '工作区已不存在',
    browserPageNoLongerExists: '浏览器标签页已不存在'
  },
  blank: 'Blank',
  '/': '/'
} as const
