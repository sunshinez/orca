import re

def replace_in_file(path: str, replacements: list[tuple[str, str]]) -> None:
    with open(path) as f:
        content = f.read()
    for old, new in replacements:
        if old not in content:
            print(f"WARNING: missing in {path}: {old[:80]!r}")
        else:
            content = content.replace(old, new)
    with open(path, "w") as f:
        f.write(content)

# ── RuntimePairingUrlGenerator.tsx ──
replace_in_file("src/renderer/src/components/settings/RuntimePairingUrlGenerator.tsx", [
    # remaining toasts
    ("error instanceof Error ? error.message : 'Failed to load shared access grants.'",
     "error instanceof Error ? error.message : t('settings.runtimePairing.toast.loadAccessGrantsFailed')"),
    ("toast.error('Failed to refresh network interfaces.')",
     "toast.error(t('settings.runtimePairing.toast.refreshNetworkFailed'))"),
    # JSX labels / descriptions
    (">Share this Orca server<", ">{t('settings.runtimePairing.title')}<"),
    (">Create a revocable access grant for browser or desktop clients.<",
     ">{t('settings.runtimePairing.description')}<"),
    ("Connection address\n                </Label>",
     "{t('settings.runtimePairing.connectionAddress')}\n                </Label>"),
    ("This computer ({LOOPBACK_ADDRESS})",
     "{t('settings.runtimePairing.thisComputer', { address: LOOPBACK_ADDRESS })}"),
    ("Custom address\n                </Label>",
     "{t('settings.runtimePairing.customAddress')}\n                </Label>"),
    ('placeholder="host, host:port, or wss://host/path"',
     "placeholder={t('settings.runtimePairing.customAddressPlaceholder')}"),
    (">127.0.0.1 only works on this computer. Use a LAN, Tailscale, or custom address for\n              another device.<",
     ">{t('settings.runtimePairing.addressHint')}<"),
    (">Generate Access Link<", ">{t('settings.runtimePairing.generateAccessLink')}<"),
    # label="Open in browser" appears twice – replace both
    ('label="Open in browser"',
     "label={t('settings.runtimePairing.openInBrowser')}"),
    ('description="Use this URL from a browser that can reach the selected address."',
     "description={t('settings.runtimePairing.browserUrlDescription')}"),
    ('description="Browser link unavailable in this build. The pairing URL still works for Orca clients."',
     "description={t('settings.runtimePairing.browserUrlUnavailable')}"),
    ('label="Pair another Orca client"',
     "label={t('settings.runtimePairing.pairAnotherClient')}"),
    ('description="Paste this pairing URL into another Orca client."',
     "description={t('settings.runtimePairing.pairingUrlDescription')}"),
    ('aria-label="Refresh connection addresses"',
     "aria-label={t('settings.runtimePairing.refreshAddresses')}"),
    (">Refresh connection addresses<",
     ">{t('settings.runtimePairing.refreshAddresses')}<"),
    # GeneratedUrlRow aria-label
    ("aria-label={`Copy ${label}`}",
     "aria-label={t('settings.runtimePairing.copyAria', { label })}"),
])

# ── LinearIssueWorkspace.tsx ──
replace_in_file("src/renderer/src/components/LinearIssueWorkspace.tsx", [
    # Sub-issue button – add useTranslation hook
    ("  const [openingSubIssueId, setOpeningSubIssueId] = useState<string | null>(null)\n\n  useEffect(() => {",
     "  const [openingSubIssueId, setOpeningSubIssueId] = useState<string | null>(null)\n  const { t } = useTranslation()\n\n  useEffect(() => {"),
    # Project card – add useTranslation hook
    ("  const [savingProjectId, setSavingProjectId] = useState<string | null>(null)\n\n  useEffect(() => {",
     "  const [savingProjectId, setSavingProjectId] = useState<string | null>(null)\n  const { t } = useTranslation()\n\n  useEffect(() => {"),
    # Sub-issue strings
    (">Add sub-issues<", ">{t('linear.subIssues.addSubIssues')}<"),
    ('placeholder="Sub-issue title"', "placeholder={t('linear.subIssues.subIssueTitlePlaceholder')}"),
    (">Create<", ">{t('linear.subIssues.create')}<"),
    # Project card strings
    (">Project<", ">{t('linear.projectCard.title')}<"),
    ("{issue.project?.name ?? 'Add to project'}",
     "{issue.project?.name ?? t('linear.projectCard.addToProject')}"),
    ('placeholder="Search projects"', "placeholder={t('linear.projectCard.searchPlaceholder')}"),
    (">Loading projects<", ">{t('linear.projectCard.loading')}<"),
    ("{query.trim() ? 'No projects found.' : 'Search for a project to add.'}",
     "{query.trim() ? t('linear.projectCard.noProjectsFound') : t('linear.projectCard.searchForProject')}"),
    # Main component strings
    ("{displayed?.title ?? 'Linear issue'}",
     "{displayed?.title ?? t('linear.workspace.fallbackTitle')}"),
    ("            Preview, edit, and start work from the selected issue.\n          </SheetDescription>",
     "            {t('linear.workspace.sheetDescription')}\n          </SheetDescription>"),
    (">Issues<", ">{t('linear.workspace.issues')}<"),
    ('aria-label="Copy Linear URL"', "aria-label={t('linear.workspace.copyUrlAria')}"),
    (">Copy URL<", ">{t('linear.workspace.copyUrl')}<"),
    ('aria-label="Copy issue identifier"', "aria-label={t('linear.workspace.copyIdentifierAria')}"),
    (">Copy identifier<", ">{t('linear.workspace.copyIdentifier')}<"),
    ('aria-label="Start workspace from issue"', "aria-label={t('linear.workspace.startWorkspaceAria')}"),
    (">Start workspace<", ">{t('linear.workspace.startWorkspace')}<"),
    ('aria-label="Close Linear issue preview"', "aria-label={t('linear.workspace.closePreviewAria')}"),
    (">Close<", ">{t('linear.workspace.close')}<"),
    (">No description provided.<", ">{t('linear.workspace.noDescription')}<"),
    (">Activity<", ">{t('linear.workspace.activity')}<"),
    # issue updated sentence
    ("{displayed.assignee?.displayName ?? 'Someone'} updated the issue ·{' '}\n                        {formatLinearIssueRelativeTime(displayed.updatedAt)}",
     "{t('linear.workspace.issueUpdated', {\n                          assignee: displayed.assignee?.displayName ?? t('linear.workspace.someone'),\n                          time: formatLinearIssueRelativeTime(displayed.updatedAt)\n                        })}"),
    (">Retry<", ">{t('linear.workspace.retry')}<"),
    ("{comment.user?.displayName ?? 'Unknown'}",
     "{comment.user?.displayName ?? t('linear.workspace.unknownUser')}"),
    (">Actions<", ">{t('linear.workspace.actions')}<"),
    # loadComments fallback
    ("error instanceof Error ? error.message : 'Failed to load comments.'",
     "error instanceof Error ? error.message : t('linear.toast.loadCommentsFailed')"),
    # comment added optimistic user
    ("user: { displayName: 'You' }", "user: { displayName: t('linear.workspace.you') }"),
    # actionItems labels
    ("        label: 'Copy URL',\n        icon: Clipboard,\n        action: () => void copyTextToClipboard(displayed.url, t('linear.copyLabels.url'))",
     "        label: t('linear.copyLabels.url'),\n        icon: Clipboard,\n        action: () => void copyTextToClipboard(displayed.url, t('linear.copyLabels.url'))"),
    ("        label: 'Copy identifier',\n        icon: Clipboard,\n        action: () => void copyTextToClipboard(displayed.identifier, t('linear.copyLabels.identifier'))",
     "        label: t('linear.copyLabels.identifier'),\n        icon: Clipboard,\n        action: () => void copyTextToClipboard(displayed.identifier, t('linear.copyLabels.identifier'))"),
    ("        label: 'Copy suggested branch name',\n        icon: GitBranch,\n        action: () =>\n          void copyTextToClipboard(buildLinearIssueBranchName(displayed), t('linear.copyLabels.suggestedBranchName'))",
     "        label: t('linear.copyLabels.suggestedBranchName'),\n        icon: GitBranch,\n        action: () =>\n          void copyTextToClipboard(buildLinearIssueBranchName(displayed), t('linear.copyLabels.suggestedBranchName'))"),
    ("        label: 'Copy prompt',\n        icon: Clipboard,\n        action: () => void copyTextToClipboard(buildLinearIssuePrompt(displayed), t('linear.copyLabels.prompt'))",
     "        label: t('linear.copyLabels.prompt'),\n        icon: Clipboard,\n        action: () => void copyTextToClipboard(buildLinearIssuePrompt(displayed), t('linear.copyLabels.prompt'))"),
    # actionItems deps
    ("  }, [displayed])", "  }, [displayed, t])"),
])

# ── AutomationsPage.tsx ──
replace_in_file("src/renderer/src/components/automations/AutomationsPage.tsx", [
    # Unsupported schedule messages
    (": 'This automation has an unsupported saved schedule. Pick a supported schedule before saving changes.'",
     ": t('automations.unsupportedSchedule')"),
    (": 'This Hermes cron has an unsupported saved schedule. Pick a supported schedule before saving changes.'",
     ": t('automations.unsupportedHermesSchedule')"),
    # toast with settings action
    ("      description: 'You can change this in Settings.',",
     "      description: t('automations.toast.skipConfirmDescription'),"),
    ("        label: 'Open Settings',",
     "        label: t('automations.toast.openSettings'),"),
    # external automation toasts
    ("? 'External automation queued.'",
     "? t('automations.toast.externalAutomationQueued')"),
    (": 'External automation paused.'",
     ": t('automations.toast.externalAutomationPaused')"),
    (": 'External automation resumed.'",
     ": t('automations.toast.externalAutomationResumed')"),
    # Header / tooltips
    ('aria-label="Close automations"', "aria-label={t('automations.closeAutomationsAria')}"),
    (">Close · Esc<", ">{t('automations.closeAutomationsTooltip')}<"),
    ('aria-label="Add automation"', "aria-label={t('automations.addAutomationAria')}"),
    (">Add automation<", ">{t('automations.addAutomationTooltip')}<"),
    ('aria-label="Refresh automations"', "aria-label={t('automations.refreshAutomationsAria')}"),
    (">Refresh automations<", ">{t('automations.refreshAutomationsTooltip')}<"),
    (">Automations<", ">{t('automations.title')}<"),
    # Dialog titles / descriptions
    (">Delete Automation<", ">{t('automations.deleteAutomationTitle')}<"),
    ("Delete{' '}\n              <span className=\"break-all font-medium text-foreground\">{deleteTarget?.name}</span>{' '}\n              and its run history. Workspaces created by previous runs are not deleted.",
     "{t('common.delete')}{' '}\n              <span className=\"break-all font-medium text-foreground\">{deleteTarget?.name}</span>{' '}\n              {t('automations.andItsRunHistory')}"),
    ("{deleteTarget.workspaceMode === 'new_per_run'\n                  ? 'New workspace each run'\n                  : 'Selected workspace'}",
     "{deleteTarget.workspaceMode === 'new_per_run'\n                  ? t('automations.newWorkspaceEachRun')\n                  : t('automations.selectedWorkspace')}"),
    ("Don&apos;t ask again", "{t('automations.dontAskAgain')}"),
    ("            Cancel\n            </Button>\n            <Button\n              ref={deleteConfirmButtonRef}\n              variant=\"destructive\"\n              onClick={() => void confirmDeleteAutomation()}\n            >\n              <Trash2 className=\"size-4\" />\n              Delete\n            </Button>",
     "            {t('common.cancel')}\n            </Button>\n            <Button\n              ref={deleteConfirmButtonRef}\n              variant=\"destructive\"\n              onClick={() => void confirmDeleteAutomation()}\n            >\n              <Trash2 className=\"size-4\" />\n              {t('common.delete')}\n            </Button>"),
    (">Delete External Automation<", ">{t('automations.deleteExternalAutomationTitle')}<"),
    ("from{' '}\n              {externalDeleteTarget\n                ? getExternalProviderLabel(externalDeleteTarget.manager)\n                : 'external source'}{' '}\n              on {externalDeleteTarget?.manager.targetLabel}.",
     "{t('automations.from')}{' '}\n              {externalDeleteTarget\n                ? getExternalProviderLabel(externalDeleteTarget.manager)\n                : t('automations.externalSource')}{' '}\n              {t('automations.on')} {externalDeleteTarget?.manager.targetLabel}."),
    ("            Cancel\n            </Button>\n            <Button\n              ref={deleteConfirmButtonRef}\n              variant=\"destructive\"\n              onClick={() => void confirmDeleteExternalAutomation()}\n            >\n              <Trash2 className=\"size-4\" />\n              Delete\n            </Button>",
     "            {t('common.cancel')}\n            </Button>\n            <Button\n              ref={deleteConfirmButtonRef}\n              variant=\"destructive\"\n              onClick={() => void confirmDeleteExternalAutomation()}\n            >\n              <Trash2 className=\"size-4\" />\n              {t('common.delete')}\n            </Button>"),
    # List headers
    ("<span>Automation</span>\n                <span>Next</span>",
     "<span>{t('automations.automationHeader')}</span>\n                <span>{t('automations.nextHeader')}</span>"),
    # workspace label + usage text
    ("automation.workspaceMode === 'new_per_run'\n                  ? `Create from ${automation.baseBranch ?? automationRepo?.worktreeBaseRef ?? 'project default'}`\n                  : (automationWorktree?.displayName ?? 'Missing workspace')",
     "automation.workspaceMode === 'new_per_run'\n                  ? t('automations.createFromBranch', { branch: automation.baseBranch ?? automationRepo?.worktreeBaseRef ?? t('automations.projectDefault') })\n                  : (automationWorktree?.displayName ?? t('automations.missingWorkspace'))"),
    ("const usageText =\n                usageSummary.knownRuns > 0\n                  ? `${formatAutomationCost(\n                      usageSummary.estimatedCostUsd\n                    )} est. · ${formatAutomationTokens(usageSummary.totalTokens)} tokens`\n                  : usageSummary.unavailableRuns > 0\n                    ? 'Usage unavailable'\n                    : 'No run usage yet'",
     "const usageText =\n                usageSummary.knownRuns > 0\n                  ? t('automations.usageText', {\n                      cost: formatAutomationCost(usageSummary.estimatedCostUsd),\n                      tokens: formatAutomationTokens(usageSummary.totalTokens)\n                    })\n                  : usageSummary.unavailableRuns > 0\n                    ? t('automations.usageUnavailable')\n                    : t('automations.noRunUsageYet')"),
    ("const nextRunLabel = automation.enabled\n                ? formatAutomationDateTimeWithRelative(automation.nextRunAt, relativeNow)\n                : 'Paused'",
     "const nextRunLabel = automation.enabled\n                ? formatAutomationDateTimeWithRelative(automation.nextRunAt, relativeNow)\n                : t('automations.paused')"),
    ("<span>Unknown project</span>", "<span>{t('automations.unknownProject')}</span>"),
    # source status + summary
    ("const sourceStatus =\n                  entry.manager.target.type === 'ssh' ? 'Connect to load jobs' : 'Unavailable'",
     "const sourceStatus =\n                  entry.manager.target.type === 'ssh' ? t('automations.connectToLoadJobs') : t('automations.unavailable')"),
    ("`${providerLabel} source unavailable until ${targetKindLabel.toLowerCase()} connects.`",
     "t('automations.sourceUnavailable', { provider: providerLabel, targetKind: targetKindLabel.toLowerCase() })"),
    # external nextRunLabel
    ("const nextRunLabel = entry.job.enabled\n                ? formatExternalDate(entry.job.nextRunAt, relativeNow)\n                : 'Paused'",
     "const nextRunLabel = entry.job.enabled\n                ? formatExternalDate(t, entry.job.nextRunAt, relativeNow)\n                : t('automations.paused')"),
    # run / runs / Manageable / Read-only
    ("`${entry.job.runCount} ${entry.job.runCount === 1 ? 'run' : 'runs'}`",
     "`${entry.job.runCount} ${entry.job.runCount === 1 ? t('automations.run_one') : t('automations.run_other')}`"),
    ("? 'Manageable'\n                                : 'Read-only'",
     "? t('automations.manageable')\n                                : t('automations.readOnly')"),
    # Context menus
    (">Run Now<", ">{t('automations.runNow')}<"),
    (">Edit<", ">{t('automations.edit')}<"),
    ("{automation.enabled ? 'Pause' : 'Resume'}", "{automation.enabled ? t('automations.pause') : t('automations.resume')}"),
    ("{entry.job.enabled ? 'Pause' : 'Resume'}", "{entry.job.enabled ? t('automations.pause') : t('automations.resume')}"),
    (">Delete<", ">{t('common.delete')}<"),
    # Connect SSH / Connecting
    ("{isSelectedExternalSshConnecting ? 'Connecting...' : 'Connect SSH'}",
     "{isSelectedExternalSshConnecting ? t('automations.connecting') : t('automations.connectSsh')}"),
    # Tabs
    ("<TabsTrigger value=\"overview\">Overview</TabsTrigger>",
     "<TabsTrigger value=\"overview\">{t('automations.overviewTab')}</TabsTrigger>"),
    ("<TabsTrigger value=\"runs\" disabled={!selected}>\n                    Runs",
     "<TabsTrigger value=\"runs\" disabled={!selected}>\n                    {t('automations.runsTab')}"),
    # Detail pane strings
    ("selectedRepo?.displayName ?? 'Unknown project'",
     "selectedRepo?.displayName ?? t('automations.unknownProject')"),
    ("selected?.workspaceMode === 'new_per_run'\n                      ? 'New workspace each run'\n                      : (selectedWorktree?.displayName ?? 'Missing workspace')",
     "selected?.workspaceMode === 'new_per_run'\n                      ? t('automations.newWorkspaceEachRun')\n                      : (selectedWorktree?.displayName ?? t('automations.missingWorkspace'))"),
    ("                      'Orca',\n                      selectedAutomationRunPageWorkspaceDisplay?.detailLabel ?? 'No workspace'",
     "                      t('automations.orca'),\n                      selectedAutomationRunPageWorkspaceDisplay?.detailLabel ?? t('automations.noWorkspace')"),
    ("selectedAutomationRunPage.outputSnapshot?.truncated\n                        ? 'Latest saved output'\n                        : null",
     "selectedAutomationRunPage.outputSnapshot?.truncated\n                        ? t('automations.latestSavedOutput')\n                        : null"),
    # Empty states
    ("Select an automation to view runs.", "{t('automations.selectAutomationToViewRuns')}"),
    ("<div className=\"px-1 pb-1 text-sm font-medium\">Start from a template</div>",
     "<div className=\"px-1 pb-1 text-sm font-medium\">{t('automations.startFromTemplate')}</div>"),
    ("                  Add new\n                </Button>",
     "                  {t('automations.addNew')}\n                </Button>"),
    # Helper functions – accept t
    ("function formatExternalDate(value: string | null, now: number): string {\n  if (!value) {\n    return 'Never'",
     "function formatExternalDate(t: (key: string) => string, value: string | null, now: number): string {\n  if (!value) {\n    return t('automations.never')"),
    ("function getExternalTargetKindLabel(manager: ExternalAutomationManager): string {\n  return manager.target.type === 'ssh' ? 'Remote SSH' : 'Local'",
     "function getExternalTargetKindLabel(t: (key: string) => string, manager: ExternalAutomationManager): string {\n  return manager.target.type === 'ssh' ? t('automations.targetKindRemoteSsh') : t('automations.targetKindLocal')"),
    ("function getExternalRunStatusLabel(run: ExternalAutomationRun): string {\n  switch (run.status) {\n    case 'completed':\n      return 'Completed'\n    case 'failed':\n      return 'Failed'\n    case 'unknown':\n      return 'Unknown'",
     "function getExternalRunStatusLabel(t: (key: string) => string, run: ExternalAutomationRun): string {\n  switch (run.status) {\n    case 'completed':\n      return t('automations.statusCompleted')\n    case 'failed':\n      return t('automations.statusFailed')\n    case 'unknown':\n      return t('automations.statusUnknown')"),
    ("function getExternalRunContent(run: ExternalAutomationRun): string {\n  return run.outputContent ?? run.error ?? run.outputPreview ?? 'No output content available.'",
     "function getExternalRunContent(t: (key: string) => string, run: ExternalAutomationRun): string {\n  return run.outputContent ?? run.error ?? run.outputPreview ?? t('automations.noOutputContent')"),
    ("function getAutomationRunContent(run: AutomationRun): string {\n  const savedOutput = run.outputSnapshot?.content.trim()\n  if (savedOutput) {\n    return run.outputSnapshot?.content ?? savedOutput\n  }\n  return run.error ?? run.usage?.unavailableMessage ?? 'No output content available.'",
     "function getAutomationRunContent(t: (key: string) => string, run: AutomationRun): string {\n  const savedOutput = run.outputSnapshot?.content.trim()\n  if (savedOutput) {\n    return run.outputSnapshot?.content ?? savedOutput\n  }\n  return run.error ?? run.usage?.unavailableMessage ?? t('automations.noOutputContent')"),
    # Helper call sites – pass t
    ("formatExternalDate(entry.job.nextRunAt, relativeNow)",
     "formatExternalDate(t, entry.job.nextRunAt, relativeNow)"),
    ("getExternalTargetKindLabel(entry.manager)", "getExternalTargetKindLabel(t, entry.manager)"),
    ("getExternalRunStatusLabel(selectedExternalRunPage.run)", "getExternalRunStatusLabel(t, selectedExternalRunPage.run)"),
    ("getExternalRunContent(selectedExternalRunPage.run)", "getExternalRunContent(t, selectedExternalRunPage.run)"),
    ("getAutomationRunContent(selectedAutomationRunPage)", "getAutomationRunContent(t, selectedAutomationRunPage)"),
])

print("Files patched.")
