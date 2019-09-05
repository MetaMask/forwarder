#!/usr/bin/env bash

set -u
set -o pipefail

readonly __SCRIPT_NAME__="${0##*/}"
readonly __SEE_HELP_MESSAGE__="See '${__SCRIPT_NAME__} --help' for more information."

function die {
	local message="${1}"

	printf "ERROR: %s\\n" "${message}" >&2

	exit 1
}

function show_help {
	cat << EOF
${__SCRIPT_NAME__}"

Deploy site to GitHub Pages branch

Options:
	-h, --help               Show help text
	-b, --branch <branch>    Branch to deploy to (defaults to 'gh-pages')
	-r, --remote <remote>	   Remote to deploy to (defaults to 'origin')
EOF
}

function is_working_tree_dirty {
  ! git diff --quiet
}


function main {
  local branch='gh-pages'
  local remote='origin'

	while :; do
		case "${1-default}" in
			-h|--help)
				show_help
				exit
				;;
			-b|--branch)
        if [[ -z $2 ]]; then
					printf "'branch' option requires an argument.\\n" >&2
					printf "%s\\n" "${__SEE_HELP_MESSAGE__}" >&2
					exit 1
				fi
        branch="${2}"
        shift
				;;
			-r|--remote)
        if [[ -z $2 ]]; then
					printf "'remote' option requires an argument.\\n" >&2
					printf "%s\\n" "${__SEE_HELP_MESSAGE__}" >&2
					exit 1
				fi
        remote="${2}"
        shift
				;;
			*)
				break
		esac

		shift
	done

  if is_working_tree_dirty
  then
    die 'Dirty working tree'
  fi

  git subtree push --prefix dist "${remote}" "${branch}" || die 'Failed to deploy branch'
}

main "${@}"
