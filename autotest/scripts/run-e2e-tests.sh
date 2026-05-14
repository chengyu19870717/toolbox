#!/usr/bin/env bash
# =============================================================================
# run-e2e-tests.sh — Run E2E smoke tests for the ToolBox project
#
# Usage:
#   ./run-e2e-tests.sh [--help]
#
# Arguments:
#   --help   Show this help message
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
HEALTH_ENDPOINT="http://localhost:8080/health"
TIMEOUT=30

# ── Argument parsing ────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case "$1" in
        --help|-h)
            echo "Usage: $0 [--help]"
            echo ""
            echo "Runs E2E smoke tests against a running ToolBox instance."
            echo ""
            echo "Requirements:"
            echo "  - ToolBox app must be running (health endpoint reachable)"
            echo "  - Docker must be available for containerized dependencies"
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
check_docker() {
    if ! command -v docker &>/dev/null; then
        log_warn "Docker is not installed or not in PATH."
        log_warn "E2E tests may fail if containerized dependencies are required."
        return 1
    fi

    if ! docker info &>/dev/null; then
        log_warn "Docker daemon is not running."
        log_warn "E2E tests may fail if containerized dependencies are required."
        return 1
    fi

    log_info "Docker is available and running."
    return 0
}

check_app_running() {
    log_info "Checking if ToolBox app is running at $HEALTH_ENDPOINT ..."

    local start_time
    start_time=$(date +%s)

    while true; do
        local http_code
        http_code=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_ENDPOINT" 2>/dev/null || echo "000")

        if [[ "$http_code" == "200" ]]; then
            log_success "ToolBox app is running and healthy."
            return 0
        fi

        local current_time
        current_time=$(date +%s)
        local elapsed=$(( current_time - start_time ))

        if [[ $elapsed -ge $TIMEOUT ]]; then
            log_error "ToolBox app is not reachable at $HEALTH_ENDPOINT after ${TIMEOUT}s."
            log_error "Please start the ToolBox app before running E2E tests."
            return 1
        fi

        log_info "Waiting for ToolBox app... (${elapsed}s/${TIMEOUT}s)"
        sleep 2
    done
}

# ── Test execution ──────────────────────────────────────────────────────────
run_e2e_tests() {
    log_header "Running E2E Smoke Tests"

    cd "$PROJECT_ROOT"

    log_info "Starting Playwright E2E tests..."
    echo "-----------------------------------------------"

    local playwright_output
    if playwright_output=$(npx playwright test --reporter=list 2>&1); then
        echo "$playwright_output"

        # Parse results
        local passed failed
        passed=$(echo "$playwright_output" | grep -cP '✓|passed' || echo "0")
        failed=$(echo "$playwright_output" | grep -cP '✗|failed' || echo "0")

        echo ""
        echo -e "  ${BOLD}E2E Test Results:${NC}"
        echo -e "    Passed:   ${GREEN}${passed}${NC}"
        echo -e "    Failed:   ${RED}${failed}${NC}"
        echo ""
        log_success "E2E smoke tests completed successfully."
        return 0
    else
        echo "$playwright_output"

        local failed
        failed=$(echo "$playwright_output" | grep -cP '✗|failed' || echo "0")

        echo ""
        echo -e "  ${BOLD}E2E Test Results:${NC}"
        echo -e "    Failed:   ${RED}${failed}${NC}"
        log_error "E2E smoke tests failed."
        return 1
    fi
}

# ── Main ────────────────────────────────────────────────────────────────────
main() {
    log_header "ToolBox E2E Test Runner"
    log_info "Project root: $PROJECT_ROOT"

    # Check Docker (warning only, not blocking)
    check_docker || true

    # Check if app is running (blocking)
    if ! check_app_running; then
        log_error "Cannot proceed with E2E tests without a running ToolBox instance."
        exit 1
    fi

    # Run tests
    if run_e2e_tests; then
        log_success "All E2E tests passed."
        exit 0
    else
        log_error "E2E tests completed with failures."
        exit 1
    fi
}

main "$@"
