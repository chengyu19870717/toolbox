#!/usr/bin/env bash
# =============================================================================
# run-backend-tests.sh — Run backend Java tests for the ToolBox project
#
# Usage:
#   ./run-backend-tests.sh [--unit | --integration | --all]
#
# Arguments:
#   --unit          Run only unit tests
#   --integration   Run only integration tests
#   --all           Run all tests (default)
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
TEST_MODE="all"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# ── Argument parsing ────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case "$1" in
        --unit)
            TEST_MODE="unit"
            shift
            ;;
        --integration)
            TEST_MODE="integration"
            shift
            ;;
        --all)
            TEST_MODE="all"
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [--unit | --integration | --all]"
            echo ""
            echo "Arguments:"
            echo "  --unit          Run only unit tests"
            echo "  --integration   Run only integration tests"
            echo "  --all           Run all tests (default)"
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
check_java() {
    if ! command -v java &>/dev/null; then
        log_error "Java is not installed. Please install Java 21 or later."
        exit 1
    fi

    local java_version
    java_version=$(java -version 2>&1 | head -n1 | grep -oP '(?<=version ")[^"]+' || true)
    local major
    major=$(echo "$java_version" | grep -oP '^\d+' || echo "0")

    if [[ "$major" -lt 21 ]]; then
        log_warn "Java version detected: $java_version"
        log_warn "Java 21 or later is recommended. You may encounter compatibility issues."
    else
        log_info "Java version: $java_version"
    fi
}

check_gradle() {
    if [[ ! -f "$PROJECT_ROOT/gradlew" ]]; then
        log_error "Gradle wrapper (./gradlew) not found in $PROJECT_ROOT."
        log_error "Please ensure the project has been initialized with Gradle."
        exit 1
    fi
    log_info "Gradle wrapper found."
}

# ── Test execution ──────────────────────────────────────────────────────────
run_unit_tests() {
    log_header "Running Unit Tests"

    cd "$PROJECT_ROOT"

    # Ensure temp directory exists (Gradle requires it)
    local test_tmpdir="${TMPDIR:-/tmp}/toolbox-test"
    mkdir -p "$test_tmpdir"

    local gradle_output
    gradle_output=$(./gradlew :framework:test --tests "*Test" \
        --info \
        -Djwt.secret="${JWT_SECRET:-default-test-secret-key-change-in-production}" \
        -Djava.io.tmpdir="$test_tmpdir" \
        2>&1) || true

    echo "$gradle_output"

    # Parse test results from Gradle output (macOS compatible - no -P flag)
    local total passed failed skipped
    total=$(echo "$gradle_output" | grep -oE '[0-9]+ tests? completed' | grep -oE '[0-9]+' || echo "0")
    failed=$(echo "$gradle_output" | grep -oE 'failed[[:space:]]*[0-9]+' | grep -oE '[0-9]+$' || echo "0")
    skipped=$(echo "$gradle_output" | grep -oE 'skipped[[:space:]]*[0-9]+' | grep -oE '[0-9]+$' || echo "0")

    # Derive passed from total - failed
    if [[ "$total" -gt 0 ]] && [[ "$failed" -gt 0 ]]; then
        passed=$(( total - failed - skipped ))
    elif [[ "$total" -gt 0 ]]; then
        passed=$total
    else
        passed=0
    fi

    echo ""
    echo -e "  ${BOLD}Test Summary:${NC}"
    echo -e "    Passed:   ${GREEN}${passed}${NC}"
    echo -e "    Failed:   ${RED}${failed}${NC}"
    echo -e "    Skipped:  ${YELLOW}${skipped}${NC}"

    if echo "$gradle_output" | grep -q "BUILD FAILED"; then
        log_error "Unit tests failed."
        return 1
    fi

    log_success "Unit tests passed."
    return 0
}

run_integration_tests() {
    log_header "Running Integration Tests"

    cd "$PROJECT_ROOT"

    # Ensure temp directory exists (Gradle requires it)
    local test_tmpdir="${TMPDIR:-/tmp}/toolbox-test"
    mkdir -p "$test_tmpdir"

    local gradle_output
    gradle_output=$(./gradlew :framework:test --tests "*IntegrationTest" \
        --info \
        -Djwt.secret="${JWT_SECRET:-default-test-secret-key-change-in-production}" \
        -Djava.io.tmpdir="$test_tmpdir" \
        2>&1) || true

    echo "$gradle_output"

    # Parse test results (macOS compatible - no -P flag)
    local total failed skipped
    total=$(echo "$gradle_output" | grep -oE '[0-9]+ tests? completed' | grep -oE '[0-9]+' || echo "0")
    failed=$(echo "$gradle_output" | grep -oE 'failed[[:space:]]*[0-9]+' | grep -oE '[0-9]+$' || echo "0")
    skipped=$(echo "$gradle_output" | grep -oE 'skipped[[:space:]]*[0-9]+' | grep -oE '[0-9]+$' || echo "0")

    local passed=0
    if [[ "$total" -gt 0 ]] && [[ "$failed" -gt 0 ]]; then
        passed=$(( total - failed - skipped ))
    elif [[ "$total" -gt 0 ]]; then
        passed=$total
    fi

    echo ""
    echo -e "  ${BOLD}Test Summary:${NC}"
    echo -e "    Passed:   ${GREEN}${passed}${NC}"
    echo -e "    Failed:   ${RED}${failed}${NC}"
    echo -e "    Skipped:  ${YELLOW}${skipped}${NC}"

    if echo "$gradle_output" | grep -q "BUILD FAILED"; then
        log_error "Integration tests failed."
        return 1
    fi

    log_success "Integration tests passed."
    return 0
}

# ── Main ────────────────────────────────────────────────────────────────────
main() {
    log_header "ToolBox Backend Test Runner"
    log_info "Project root: $PROJECT_ROOT"
    log_info "Test mode:    $TEST_MODE"

    check_java
    check_gradle

    local exit_code=0

    case "$TEST_MODE" in
        unit)
            run_unit_tests || exit_code=1
            ;;
        integration)
            run_integration_tests || exit_code=1
            ;;
        all)
            run_unit_tests || exit_code=1
            run_integration_tests || exit_code=1
            ;;
    esac

    if [[ $exit_code -ne 0 ]]; then
        log_error "Backend tests completed with failures."
    else
        log_success "All backend tests passed."
    fi

    exit $exit_code
}

main "$@"
