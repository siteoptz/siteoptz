<?php
/**
 * SiteOptz.ai Redirect Testing Script
 * Tests for 308 to 301 redirects and other redirect issues
 */

// Configuration
$test_urls = array(
    // Main site URLs
    'https://siteoptz.ai',
    'https://www.siteoptz.ai',
    'https://siteoptz.ai/',
    'https://www.siteoptz.ai/',
    
    // Category URLs
    'https://siteoptz.ai/ai-category',
    'https://siteoptz.ai/ai-category/',
    'https://siteoptz.ai/tool-category',
    'https://siteoptz.ai/tool-category/',
    
    // Tool URLs
    'https://siteoptz.ai/ai-tools',
    'https://siteoptz.ai/ai-tools/',
    'https://siteoptz.ai/tools',
    'https://siteoptz.ai/tools/',
    
    // Specific tool examples
    'https://siteoptz.ai/ai-tools/chatgpt',
    'https://siteoptz.ai/tools/chatgpt',
    'https://siteoptz.ai/tool-category/content-creation',
    'https://siteoptz.ai/tool-category/marketing-digital',
    
    // HTTP vs HTTPS
    'http://siteoptz.ai',
    'http://www.siteoptz.ai',
    'http://siteoptz.ai/ai-category',
    
    // Trailing slash variations
    'https://siteoptz.ai/ai-category/content-creation',
    'https://siteoptz.ai/ai-category/content-creation/',
    
    // Common redirect patterns
    'https://siteoptz.ai/index.php',
    'https://siteoptz.ai/home',
    'https://siteoptz.ai/homepage',
);

// Function to test redirects
function test_redirect($url, $follow_redirects = true) {
    $ch = curl_init();
    
    curl_setopt_array($ch, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER => true,
        CURLOPT_NOBODY => true,
        CURLOPT_FOLLOWLOCATION => $follow_redirects,
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_USERAGENT => 'SiteOptz.ai Redirect Tester/1.0',
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_VERBOSE => false,
    ));
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $redirect_url = curl_getinfo($ch, CURLINFO_REDIRECT_URL);
    $final_url = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    $redirect_count = curl_getinfo($ch, CURLINFO_REDIRECT_COUNT);
    
    $error = curl_error($ch);
    curl_close($ch);
    
    return array(
        'url' => $url,
        'http_code' => $http_code,
        'redirect_url' => $redirect_url,
        'final_url' => $final_url,
        'redirect_count' => $redirect_count,
        'error' => $error,
        'response' => $response
    );
}

// Function to analyze redirect chain
function analyze_redirect_chain($url) {
    $redirects = array();
    $current_url = $url;
    $max_redirects = 10;
    $redirect_count = 0;
    
    while ($redirect_count < $max_redirects) {
        $result = test_redirect($current_url, false);
        
        $redirects[] = array(
            'step' => $redirect_count + 1,
            'url' => $current_url,
            'http_code' => $result['http_code'],
            'redirect_url' => $result['redirect_url'],
            'final_url' => $result['final_url']
        );
        
        if ($result['http_code'] >= 300 && $result['http_code'] < 400 && $result['redirect_url']) {
            $current_url = $result['redirect_url'];
            $redirect_count++;
        } else {
            break;
        }
    }
    
    return $redirects;
}

// Function to check for problematic redirects
function check_problematic_redirects($redirects) {
    $issues = array();
    
    foreach ($redirects as $redirect) {
        $http_code = $redirect['http_code'];
        
        // Check for 308 redirects (should be 301)
        if ($http_code == 308) {
            $issues[] = array(
                'type' => '308 Redirect',
                'severity' => 'High',
                'url' => $redirect['url'],
                'issue' => '308 redirect detected - should be 301 for SEO',
                'recommendation' => 'Change 308 to 301 redirect'
            );
        }
        
        // Check for 302 redirects (should be 301 for permanent moves)
        if ($http_code == 302) {
            $issues[] = array(
                'type' => '302 Redirect',
                'severity' => 'Medium',
                'url' => $redirect['url'],
                'issue' => '302 redirect detected - consider 301 for permanent moves',
                'recommendation' => 'Change 302 to 301 if redirect is permanent'
            );
        }
        
        // Check for redirect loops
        if ($redirect['step'] > 5) {
            $issues[] = array(
                'type' => 'Redirect Loop',
                'severity' => 'High',
                'url' => $redirect['url'],
                'issue' => 'Potential redirect loop detected',
                'recommendation' => 'Review redirect chain for loops'
            );
        }
        
        // Check for mixed content
        if (strpos($redirect['url'], 'http://') === 0 && strpos($redirect['redirect_url'], 'https://') === 0) {
            $issues[] = array(
                'type' => 'Mixed Content',
                'severity' => 'Medium',
                'url' => $redirect['url'],
                'issue' => 'HTTP to HTTPS redirect detected',
                'recommendation' => 'Ensure all redirects use HTTPS'
            );
        }
    }
    
    return $issues;
}

// Function to generate redirect report
function generate_redirect_report($results) {
    $report = array(
        'total_tests' => count($results),
        'successful_tests' => 0,
        'failed_tests' => 0,
        'redirect_issues' => array(),
        'summary' => array()
    );
    
    foreach ($results as $result) {
        if ($result['error']) {
            $report['failed_tests']++;
        } else {
            $report['successful_tests']++;
        }
        
        // Analyze redirect chain
        $redirects = analyze_redirect_chain($result['url']);
        $issues = check_problematic_redirects($redirects);
        
        if (!empty($issues)) {
            $report['redirect_issues'] = array_merge($report['redirect_issues'], $issues);
        }
        
        // Summary by HTTP code
        $http_code = $result['http_code'];
        if (!isset($report['summary'][$http_code])) {
            $report['summary'][$http_code] = 0;
        }
        $report['summary'][$http_code]++;
    }
    
    return $report;
}

// Function to display results
function display_results($results, $report) {
    echo "<h2>SiteOptz.ai Redirect Test Results</h2>\n";
    echo "<p><strong>Test Date:</strong> " . date('Y-m-d H:i:s') . "</p>\n";
    echo "<p><strong>Total URLs Tested:</strong> " . $report['total_tests'] . "</p>\n";
    echo "<p><strong>Successful Tests:</strong> " . $report['successful_tests'] . "</p>\n";
    echo "<p><strong>Failed Tests:</strong> " . $report['failed_tests'] . "</p>\n";
    
    echo "<h3>HTTP Status Code Summary</h3>\n";
    echo "<table border='1' cellpadding='5' cellspacing='0'>\n";
    echo "<tr><th>HTTP Code</th><th>Count</th><th>Description</th></tr>\n";
    
    $status_descriptions = array(
        200 => 'OK',
        301 => 'Moved Permanently',
        302 => 'Found (Temporary Redirect)',
        307 => 'Temporary Redirect',
        308 => 'Permanent Redirect (Problematic)',
        404 => 'Not Found',
        500 => 'Internal Server Error'
    );
    
    foreach ($report['summary'] as $code => $count) {
        $description = isset($status_descriptions[$code]) ? $status_descriptions[$code] : 'Unknown';
        echo "<tr><td>{$code}</td><td>{$count}</td><td>{$description}</td></tr>\n";
    }
    echo "</table>\n";
    
    if (!empty($report['redirect_issues'])) {
        echo "<h3>Redirect Issues Found</h3>\n";
        echo "<table border='1' cellpadding='5' cellspacing='0'>\n";
        echo "<tr><th>Type</th><th>Severity</th><th>URL</th><th>Issue</th><th>Recommendation</th></tr>\n";
        
        foreach ($report['redirect_issues'] as $issue) {
            $severity_color = $issue['severity'] == 'High' ? 'red' : 'orange';
            echo "<tr style='color: {$severity_color};'>";
            echo "<td>{$issue['type']}</td>";
            echo "<td>{$issue['severity']}</td>";
            echo "<td>{$issue['url']}</td>";
            echo "<td>{$issue['issue']}</td>";
            echo "<td>{$issue['recommendation']}</td>";
            echo "</tr>\n";
        }
        echo "</table>\n";
    }
    
    echo "<h3>Detailed Test Results</h3>\n";
    echo "<table border='1' cellpadding='5' cellspacing='0'>\n";
    echo "<tr><th>URL</th><th>HTTP Code</th><th>Redirects</th><th>Final URL</th><th>Status</th></tr>\n";
    
    foreach ($results as $result) {
        $status = $result['error'] ? 'Error' : 'OK';
        $status_color = $result['error'] ? 'red' : 'green';
        
        echo "<tr style='color: {$status_color};'>";
        echo "<td>{$result['url']}</td>";
        echo "<td>{$result['http_code']}</td>";
        echo "<td>{$result['redirect_count']}</td>";
        echo "<td>{$result['final_url']}</td>";
        echo "<td>{$status}</td>";
        echo "</tr>\n";
        
        if ($result['error']) {
            echo "<tr><td colspan='5' style='color: red;'>Error: {$result['error']}</td></tr>\n";
        }
    }
    echo "</table>\n";
}

// Function to generate .htaccess recommendations
function generate_htaccess_recommendations($issues) {
    $recommendations = array();
    
    foreach ($issues as $issue) {
        if ($issue['type'] == '308 Redirect') {
            $recommendations[] = "# Fix 308 redirect for: " . $issue['url'];
            $recommendations[] = "Redirect 301 /old-path /new-path";
            $recommendations[] = "";
        }
    }
    
    if (!empty($recommendations)) {
        echo "<h3>.htaccess Recommendations</h3>\n";
        echo "<pre>\n";
        echo "# SiteOptz.ai Redirect Fixes\n";
        echo "# Generated: " . date('Y-m-d H:i:s') . "\n\n";
        echo implode("\n", $recommendations);
        echo "</pre>\n";
    }
}

// Main execution
if (isset($_GET['run_test'])) {
    echo "<h1>SiteOptz.ai Redirect Testing</h1>\n";
    echo "<p>Testing redirects for 308 to 301 issues...</p>\n";
    
    $results = array();
    
    foreach ($test_urls as $url) {
        echo "<p>Testing: {$url}...</p>\n";
        $result = test_redirect($url);
        $results[] = $result;
        
        // Small delay to avoid overwhelming the server
        usleep(100000); // 0.1 second
    }
    
    $report = generate_redirect_report($results);
    display_results($results, $report);
    generate_htaccess_recommendations($report['redirect_issues']);
    
} else {
    echo "<h1>SiteOptz.ai Redirect Testing Tool</h1>\n";
    echo "<p>This tool will test your website for redirect issues, particularly 308 to 301 redirects.</p>\n";
    echo "<p><a href='?run_test=1' class='button'>Run Redirect Test</a></p>\n";
    
    echo "<h3>What This Tool Tests:</h3>\n";
    echo "<ul>\n";
    echo "<li><strong>308 Redirects:</strong> Identifies 308 redirects that should be 301</li>\n";
    echo "<li><strong>302 Redirects:</strong> Flags 302 redirects that might should be 301</li>\n";
    echo "<li><strong>Redirect Loops:</strong> Detects potential redirect loops</li>\n";
    echo "<li><strong>Mixed Content:</strong> Checks for HTTP to HTTPS redirects</li>\n";
    echo "<li><strong>Trailing Slash Issues:</strong> Tests URL variations</li>\n";
    echo "<li><strong>WWW Redirects:</strong> Verifies www vs non-www handling</li>\n";
    echo "</ul>\n";
    
    echo "<h3>Test URLs:</h3>\n";
    echo "<ul>\n";
    foreach ($test_urls as $url) {
        echo "<li>{$url}</li>\n";
    }
    echo "</ul>\n";
}
?>
