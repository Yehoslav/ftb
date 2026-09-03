# Designer Collaboration — Mandatory Git Workflow (Valeria)

You are the **designer agent** working alongside the developer. The developer uses
[Jujutsu (jj)](https://jj-vcs.github.io/jj/) on Linux; **you use plain `git` on
this repo** (macOS). This file is your source of truth for how to collaborate
without breaking that workflow.

The site is hosted on GitHub: `origin` → `git@github.com:Yehoslav/ftb.git`
(HTTPS also works). The default branch is `master`.

## Branch model (why)

The developer publishes to `master`. Your design work must never collide with or
lose the developer's jj history, and you must always be able to keep **your own
previous, still-in-progress features**.

- **`master`** — the canonical/integration branch. You never push to it.
- **`design/valeria`** — YOUR long-lived integration branch. It always tracks
  `master` (you merge `master` into it to stay current). All your features
  accumulate here, so nothing is ever lost between tasks.
- **`vb/<feature>`** — a short-lived feature branch for ONE piece of work,
  created from `design/valeria`. When done you open a Pull Request back into
  `design/valeria`.

Flow: `master` → `design/valeria` → `vb/<feature>` → (PR) → `design/valeria` →
(developer periodically merges) → `master`.

## One-time setup (first session only; if the branch exists, skip to "Each task")

If `design/valeria` does not exist yet on the remote, the developer creates it.
Do NOT create it yourself unless asked. (Drafted command the developer runs once:)

```bash
git fetch --all --prune
git branch design/valeria origin/master
git push -u origin design/valeria
```

Then make sure you're on it and current:

```bash
git fetch --all --prune
git checkout design/valeria
git pull origin design/valeria
```

## Each task — non-negotiable sequence

### 1. Pull / sync first (ALWAYS, before any other git command)
```bash
git fetch --all --prune
git checkout design/valeria        # if not already there
git pull origin design/valeria
```

### 2. Create (or update) your feature branch from design/valeria
```bash
git checkout design/valeria
git checkout -b vb/<feature-slug>  # e.g. vb/hero-redesign
```
If the branch already exists from earlier work, stay on it and just make sure it
is up to date with `design/valeria`:
```bash
git checkout vb/<feature-slug>
git merge design/valeria
```

### 3. Implement
Work on the Svelte UI. Use the brand colors / component / accessibility rules in
`AGENTS.md`. Verify as you go:
```bash
deno task dev       # dev server
deno task check     # type check (svelte-check)
```

### 4. Commit
One logical unit per commit; clear imperative messages:
```bash
git add <changed-files>            # never `git add .` blindly
git commit -m "feat(ui): ..."
```
NEVER commit: `.env`, `local.db`, `local.db-*`, build output (`build/`,
`.svelte-kit/`), `node_modules/`, secrets. `.gitignore` already excludes these —
don't force-add them.

### 5. Push + open a PR
```bash
git push -u origin vb/<feature-slug>
gh pr create --base design/valeria --title "..." --body "..."
```
(If you don't have `gh`, open the PR from GitHub's web UI — the push prints a
"create a pull request" link.)

### 6. Hand off
Tell Valeria the PR URL and summarise what changed / what to review.

## If `git push` is rejected (remote advanced)
Never force-push (`--force` / `-f`). Reconcile normally:
```bash
git fetch --all --prune
git merge design/valeria       # or: git rebase design/valeria
# resolve conflicts in the affected files
deno task check
git commit -am "merge: integrate latest design/valeria"   # only if merge had conflicts
git push origin vb/<feature-slug>
```

## Rules recap
- Pull first, always.
- Feature branch `vb/<slug>` off `design/valeria` — never work on `master`.
- Push + PR into `design/valeria` when done.
- Never force-push, never commit secrets, never commit database/env files.
- If you're unsure how git state works, ask; do not guess with destructive
  commands (`git reset --hard`, `git clean`, force-push).

## Handoff to the developer (for their reference)
- You review/merge PRs marked `design/valeria`.
- To pull the designer's work into jj:
  ```bash
  jj git fetch --remote origin
  jj git import
  # then, when ready to fold it into master:
  jj bookmark set design/valeria -r 'remote_bookmarks()'  # optional
  jj new master        # or jj new design/valeria
  jj git push --bookmark master    # after merging design/valeria -> master on GitHub
  ```
