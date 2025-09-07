#!/bin/bash

# Test script for SiteOptz.ai redirects
# Run this after deploying to staging/production

echo "================================================"
echo "SiteOptz.ai Redirect Testing Script"
echo "================================================"
echo ""

# Configuration
if [ "$1" == "staging" ]; then
    BASE_URL="https://siteoptz-staging.vercel.app"
    echo "Testing STAGING environment: $BASE_URL"
elif [ "$1" == "production" ]; then
    BASE_URL="https://siteoptz.ai"
    echo "Testing PRODUCTION environment: $BASE_URL"
else
    echo "Usage: ./test_redirects.sh [staging|production]"
    exit 1
fi

echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Counters
PASSED=0
FAILED=0
TOTAL=0

# Function to test redirect
test_redirect() {
    local path=$1
    local expected_status=$2
    local expected_location=$3
    
    ((TOTAL++))
    
    # Make request
    response=$(curl -s -o /dev/null -w "%{http_code}:%{redirect_url}" -I "${BASE_URL}${path}")
    status_code=$(echo $response | cut -d':' -f1)
    redirect_url=$(echo $response | cut -d':' -f2-)
    
    # Check result
    if [ "$status_code" = "$expected_status" ]; then
        if [ "$expected_status" = "301" ] || [ "$expected_status" = "302" ]; then
            # Normalize URLs for comparison
            expected_full="${BASE_URL}${expected_location}"
            if [ "$redirect_url" = "$expected_full" ] || [ "$redirect_url" = "${expected_full}/" ]; then
                echo -e "${GREEN}✓${NC} $path → $expected_location"
                ((PASSED++))
            else
                echo -e "${RED}✗${NC} $path → Wrong location"
                echo "    Expected: $expected_full"
                echo "    Got: $redirect_url"
                ((FAILED++))
            fi
        else
            echo -e "${GREEN}✓${NC} $path → $expected_status"
            ((PASSED++))
        fi
    else
        echo -e "${RED}✗${NC} $path → Expected $expected_status, got $status_code"
        ((FAILED++))
    fi
}

# Test high-priority redirects
echo "Testing High-Priority Redirects (Top Traffic)"
echo "----------------------------------------------"
test_redirect "/tools?category=finance%20ai" "301" "/tools"
test_redirect "/tools?category=ux" "301" "/categories/ux"
test_redirect "/tools?category=image%20generation" "301" "/categories/image-generation"
test_redirect "/tools?category=ai%20automation" "301" "/categories/ai-automation"
test_redirect "/tools?category=video%20generation" "301" "/categories/video-generation"
test_redirect "/tools?category=email%20marketing" "301" "/categories/email-marketing"
test_redirect "/tools?category=productivity" "301" "/categories/productivity"
test_redirect "/tools?category=data%20analysis" "301" "/categories/data-analysis"

echo ""
echo "Testing Review Page Redirects"
echo "------------------------------"
test_redirect "/reviews/speechki-text-to-speech-ai" "301" "/reviews/speechmatics"
test_redirect "/reviews/cohere" "301" "/reviews/cohere-ai"
test_redirect "/reviews/videotube" "301" "/reviews/videotube-ai"
test_redirect "/reviews/kleap" "301" "/reviews/kleap-ai"

echo ""
echo "Testing Calculator Redirects"
echo "-----------------------------"
test_redirect "/tools/ai-roi-calculator" "301" "/tools/ai-cost-calculator"
test_redirect "/tools/content-roi-calculator" "301" "/tools/content-roi-calculator"
test_redirect "/tools/chatbot-roi-calculator" "301" "/tools/chatbot-roi-calculator"
test_redirect "/tools/healthcare-ai-roi" "301" "/tools/healthcare-ai-roi"

echo ""
echo "Testing Comparison Page Redirects"
echo "----------------------------------"
test_redirect "/compare/sendible/vs/hootsuite" "301" "/compare"
test_redirect "/compare/athenic-ai/vs/10web" "301" "/compare"

echo ""
echo "Testing 410 Gone Pages"
echo "-----------------------"
test_redirect "/categories/e-commerce" "410" ""
test_redirect "/reviews/text-to-video-stunning-video-creation" "410" ""
test_redirect "/reviews/stable-diffusion-web" "410" ""

echo ""
echo "Testing Redirect Targets (Should be 200 OK)"
echo "--------------------------------------------"
test_target() {
    local path=$1
    ((TOTAL++))
    
    response=$(curl -s -o /dev/null -w "%{http_code}" -I "${BASE_URL}${path}")
    
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✓${NC} $path → 200 OK"
        ((PASSED++))
    else
        echo -e "${YELLOW}⚠${NC} $path → $response (expected 200)"
        ((FAILED++))
    fi
}

test_target "/tools"
test_target "/categories/ux"
test_target "/categories/image-generation"
test_target "/categories/ai-automation"
test_target "/compare"
test_target "/reviews"
test_target "/tools/ai-cost-calculator"

echo ""
echo "================================================"
echo "TEST RESULTS"
echo "================================================"
echo "Total Tests: $TOTAL"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    echo "Redirects are working correctly."
    exit 0
else
    echo -e "${RED}✗ Some tests failed.${NC}"
    echo "Please review the redirect configuration."
    exit 1
fi