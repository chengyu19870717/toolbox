#!/usr/bin/env bash
# =============================================================================
# run-frontend-tests.sh — Run frontend unit tests for the ToolBox project
#
# Usage:
#   ./run-frontend-tests.sh [--coverage]
#
# Arguments:
#   --coverage   Run tests with coverage report
#   --help       Show this help message
# =============================================================================

set -euo pipefail

# ── Colors ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'
BOLD='\033[1m'

# ── Defaults ────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
COVERAGE_FLAG=""

# ── Argument parsing ────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case "$1" in
        --coverage)
            COVERAGE_FLAG="--coverage"
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [--coverage]"
            echo ""
            echo "Arguments:"
            echo "  --coverage   Run tests with coverage report"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown argument: $1${NC}"
            echo "Use --help for usage information."
            exit 1
            ;;
    esac
done

# ── Helper functions ────────────────────────────────────────────────────────
log_info()    { echo -e "${BLUE}[INFO]${NC}  $*"; }
log_success() { echo -e "${GREEN}[PASS]${NC}  $*"; }
log_warn()    { echo -e "${YELLOW}[WARN]${NC}  $*"; }
log_error()   { echo -e "${RED}[FAIL]${NC}  $*"; }
log_header()  {
    echo ""
    echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}${BLUE}  $*${NC}"
    echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# ── Dependency checks ───────────────────────────────────────────────────────
check_node() {
    if ! command -v node &>/dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18+."
        exit 1
    fi

    local node_version
    node_version=$(node --version)
    log_info "Node.js version: $node_version"
}

check_npm() {
    if ! command -v npm &>/dev/null; then
        log_error "npm is not installed. Please install npm."
        exit 1
    fi

    local npm_version
    npm_version=$(npm --version)
    log_info "npm version: $npm_version"
}

install_deps() {
    if [[ ! -d "$FRONTEND_DIR/node_modules" ]]; then
        log_warn "node_modules not found. Installing dependencies..."
        cd "$FRONTEND_DIR"
        npm install
        log_success "Dependencies installed."
    else
        log_info "node_modules found. Skipping install."
    fi
}

# ── Test execution ──────────────────────────────────────────────────────────
run_frontend_tests() {
    log_header "Running Frontend Unit Tests"

    cd "$FRONTEND_DIR"

    local vitest_cmd=("npx" "vitest" "run" "--reporter=verbose")

    if [[ -n "$COVERAGE_FLAG" ]]; then
        vitest_cmd+=("--coverage")
        log_info "Coverage mode enabled."
    fi

    log_info "Executing: ${vitest_cmd[*]}"
    echo "-----------------------------------------------"

    local vitest_output
    if vitest_output=$("${vitest_cmd[@]}" 2>&1); then
        echo "$vitest_output"

        # Parse test results
        local total passed failed
        total=$(echo "$vitest_output" | grep -oP '\d+ tests?' | head -1 | grep -oP '^\d+' || echo "0")
        passed=$(echo "$vitest_output" | grep -cP '✓|PASS' || echo "0")
        failed=$(echo "$vitest_output" | grep -cP '✗|FAIL' || echo "0")

        echo ""
        echo -e "  ${BOLD}Test Summary:${NC}"
        echo -e "    Total:    ${total:-N/A}"
        echo -e "    Passed:   ${GREEN}${passed}${NC}"
        echo -e "    Failed:   ${RED}${failed}${NC}"

        # Show coverage if available
        if [[ -n "$COVERAGE_FLAG" ]]; then
            echo ""
            log_info "Coverage Report:"
            echo "$vitest_output" | grep -A 20 "Coverage" || true
        fi

        log_success "Frontend unit tests passed."
        return 0
    else
        echo "$vitest_output"

        local failed
        failed=$(echo "$vitest_output" | grep -cP '✗|FAIL' || echo "0")

        echo ""
        echo -e "  ${BOLD}Test Summary:${NC}"
        echo -e "    Failed:   ${RED}${failed}${NC}"

        log_error "Frontend unit tests failed."
        return 1
    fi
}

# ── Main ────────────────────────────────────────────────────────────────────
main() {
    log_header "ToolBox Frontend Test Runner"
    log_info "Frontend dir: $FRONTEND_DIR"

    check_node
    check_npm
    install_deps

    if run_frontend_tests; then
        log_success "All frontend tests passed."
        exit 0
    else
        log_error "Frontend tests completed with failures."
        exit 1
    fi
}

main "$@"
