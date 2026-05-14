#!/usr/bin/env bash
# =============================================================================
# run-all-tests.sh — Master test runner for the ToolBox project
#
# Usage:
#   ./run-all-tests.sh [--skip-e2e] [--only-unit] [--help]
#
# Arguments:
#   --skip-e2e    Skip E2E tests (run backend + frontend only)
#   --only-unit   Run only unit tests (backend unit + frontend unit)
#   --help        Show this help message
#
# Test execution order:
#   1. Backend unit tests    (fastest)
#   2. Backend integration tests
#   3. Frontend unit tests
#   4. E2E tests            (slowest, requires running app)
# =============================================================================

set -euo pipefail

# ── Colors ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'
BOLD='\033[1m'

# ── Defaults ────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SKIP_E2E=false
ONLY_UNIT=false

# ── Argument parsing ────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case "$1" in
        --skip-e2e)
            SKIP_E2E=true
            shift
            ;;
        --only-unit)
            ONLY_UNIT=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [--skip-e2e] [--only-unit] [--help]"
            echo ""
            echo "Arguments:"
            echo "  --skip-e2e    Skip E2E tests (run backend + frontend only)"
            echo "  --only-unit   Run only unit tests (backend unit + frontend unit)"
            echo "  --help        Show this help message"
            echo ""
            echo "Test execution order:"
            echo "  1. Backend unit tests      (fastest)"
            echo "  2. Backend integration tests"
            echo "  3. Frontend unit tests"
            echo "  4. E2E tests               (slowest, requires running app)"
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

# ── Test counters ───────────────────────────────────────────────────────────
TOTAL_BACKEND=0
FAILED_BACKEND=0
TOTAL_FRONTEND=0
FAILED_FRONTEND=0
TOTAL_E2E=0
FAILED_E2E=0

# ── Test runners ────────────────────────────────────────────────────────────
run_backend_tests() {
    log_header "Backend Tests"

    local exit_code=0

    if [[ "$ONLY_UNIT" == true ]]; then
        log_info "Running backend unit tests only (--only-unit mode)..."
        if ! bash "$SCRIPT_DIR/scripts/run-backend-tests.sh" --unit; then
            FAILED_BACKEND=$((FAILED_BACKEND + 1))
            exit_code=1
        fi
        TOTAL_BACKEND=$((TOTAL_BACKEND + 1))
    else
        log_info "Running backend unit tests..."
        if ! bash "$SCRIPT_DIR/scripts/run-backend-tests.sh" --unit; then
            FAILED_BACKEND=$((FAILED_BACKEND + 1))
            exit_code=1
        fi
        TOTAL_BACKEND=$((TOTAL_BACKEND + 1))

        echo ""

        log_info "Running backend integration tests..."
        if ! bash "$SCRIPT_DIR/scripts/run-backend-tests.sh" --integration; then
            FAILED_BACKEND=$((FAILED_BACKEND + 1))
            exit_code=1
        fi
        TOTAL_BACKEND=$((TOTAL_BACKEND + 1))
    fi

    return $exit_code
}

run_frontend_tests() {
    log_header "Frontend Tests"

    if ! bash "$SCRIPT_DIR/scripts/run-frontend-tests.sh"; then
        FAILED_FRONTEND=$((FAILED_FRONTEND + 1))
        return 1
    fi

    TOTAL_FRONTEND=$((TOTAL_FRONTEND + 1))
    return 0
}

run_e2e_tests() {
    if [[ "$SKIP_E2E" == true ]]; then
        log_header "E2E Tests"
        log_warn "E2E tests skipped (--skip-e2e mode)."
        return 0
    fi

    log_header "E2E Tests"

    if ! bash "$SCRIPT_DIR/scripts/run-e2e-tests.sh"; then
        FAILED_E2E=$((FAILED_E2E + 1))
        return 1
    fi

    TOTAL_E2E=$((TOTAL_E2E + 1))
    return 0
}

# ── Main ────────────────────────────────────────────────────────────────────
main() {
    log_header "ToolBox Full Test Suite"

    local overall_start
    overall_start=$(date +%s)

    log_info "Project root: $PROJECT_ROOT"
    log_info "Skip E2E:     $SKIP_E2E"
    log_info "Only unit:    $ONLY_UNIT"

    local overall_exit=0

    # ── Run backend tests ──────────────────────────────────────────────────
    if ! run_backend_tests; then
        overall_exit=1
    fi

    echo ""

    # ── Run frontend tests ─────────────────────────────────────────────────
    if ! run_frontend_tests; then
        overall_exit=1
    fi

    echo ""

    # ── Run E2E tests ──────────────────────────────────────────────────────
    if ! run_e2e_tests; then
        overall_exit=1
    fi

    # ── Overall summary ────────────────────────────────────────────────────
    local overall_end
    overall_end=$(date +%s)
    local duration=$(( overall_end - overall_start ))

    log_header "Test Suite Summary"
    echo ""
    echo -e "  ${BOLD}Backend:${NC}       ${TOTAL_BACKEND} suite(s), ${FAILED_BACKEND} failure(s)"
    echo -e "  ${BOLD}Frontend:${NC}      ${TOTAL_FRONTEND} suite(s), ${FAILED_FRONTEND} failure(s)"
    echo -e "  ${BOLD}E2E:${NC}           ${TOTAL_E2E} suite(s), ${FAILED_E2E} failure(s)"
    echo ""
    echo -e "  ${BOLD}Total:${NC}         $(( TOTAL_BACKEND + TOTAL_FRONTEND + TOTAL_E2E )) suite(s)"
    echo -e "  ${BOLD}Duration:${NC}      ${duration}s"
    echo ""

    if [[ $overall_exit -ne 0 ]]; then
        echo -e "  ${RED}${BOLD}✗  OVERALL:  FAILED${NC}"
        log_error "Some test suites failed. Check the output above for details."
    else
        echo -e "  ${GREEN}${BOLD}✓  OVERALL:  ALL PASSED${NC}"
        log_success "All test suites passed successfully."
    fi

    echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

    exit $overall_exit
}

main "$@"
