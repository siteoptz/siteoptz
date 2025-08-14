<?php
/**
 * Template Name: Press Page
 * Description: Press releases and media resources
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

// Dynamic metadata
$page_title = 'Press & Media - Latest News About SiteOptz.ai | Press Kit';
$page_description = 'Latest press releases, news coverage, and media resources about SiteOptz.ai. Download our press kit and contact our media team.';
$canonical_url = home_url('/press/');

// Add dynamic metadata
add_action('wp_head', function() use ($page_title, $page_description, $canonical_url) {
    echo '<title>' . esc_html($page_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($page_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
});
?>

<main id="primary" class="site-main press-page">
    <div class="container">
        
        <!-- Press Header -->
        <header class="press-header">
            <h1>Press & Media</h1>
            <p>Latest news, press releases, and media resources</p>
        </header>

        <!-- Latest News -->
        <section class="latest-news">
            <h2>Latest Press Releases</h2>
            <div class="news-grid">
                <article class="news-item featured">
                    <div class="news-date">Dec 10, 2024</div>
                    <h3>SiteOptz.ai Raises $5M Series A to Accelerate AI Tools Discovery Platform</h3>
                    <p>Leading AI tools comparison platform secures funding to expand database and enhance recommendation algorithms...</p>
                    <a href="#" class="read-more">Read Full Release →</a>
                </article>
                
                <article class="news-item">
                    <div class="news-date">Nov 15, 2024</div>
                    <h3>SiteOptz.ai Reaches 100K Monthly Users Milestone</h3>
                    <p>Platform growth driven by increasing enterprise demand for AI tool guidance...</p>
                    <a href="#" class="read-more">Read More →</a>
                </article>
                
                <article class="news-item">
                    <div class="news-date">Oct 22, 2024</div>
                    <h3>New Enterprise Features Launch for AI Tool Management</h3>
                    <p>Team collaboration and advanced analytics now available for business customers...</p>
                    <a href="#" class="read-more">Read More →</a>
                </article>
            </div>
        </section>

        <!-- Media Coverage -->
        <section class="media-coverage">
            <h2>Media Coverage</h2>
            <div class="coverage-grid">
                <div class="coverage-item">
                    <div class="publication">TechCrunch</div>
                    <h4>"The definitive guide to choosing AI tools for your business"</h4>
                    <div class="coverage-date">December 2024</div>
                </div>
                <div class="coverage-item">
                    <div class="publication">Forbes</div>
                    <h4>"How SiteOptz is solving the AI tools selection problem"</h4>
                    <div class="coverage-date">November 2024</div>
                </div>
                <div class="coverage-item">
                    <div class="publication">VentureBeat</div>
                    <h4>"AI tool discovery platform sees 300% growth"</h4>
                    <div class="coverage-date">October 2024</div>
                </div>
            </div>
        </section>

        <!-- Press Kit -->
        <section class="press-kit">
            <h2>Press Kit</h2>
            <div class="kit-resources">
                <div class="resource-item">
                    <h4>📄 Company Fact Sheet</h4>
                    <p>Key statistics, milestones, and company information</p>
                    <a href="#" class="download-btn">Download PDF</a>
                </div>
                <div class="resource-item">
                    <h4>🖼️ Logo & Brand Assets</h4>
                    <p>High-resolution logos, brand guidelines, and visual assets</p>
                    <a href="#" class="download-btn">Download ZIP</a>
                </div>
                <div class="resource-item">
                    <h4>👥 Executive Photos</h4>
                    <p>Professional headshots of leadership team</p>
                    <a href="#" class="download-btn">Download ZIP</a>
                </div>
            </div>
        </section>

        <!-- Media Contact -->
        <section class="media-contact">
            <h2>Media Contact</h2>
            <div class="contact-info">
                <p><strong>Sarah Johnson</strong><br>
                Director of Communications<br>
                📧 press@siteoptz.ai<br>
                📞 +1 (555) 123-4567</p>
            </div>
        </section>

    </div>
</main>

<style>
.press-page {
    padding: 60px 0;
    background: #f8fafc;
}

.press-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.latest-news,
.media-coverage,
.press-kit,
.media-contact {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.news-grid {
    display: grid;
    gap: 30px;
}

.news-item {
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.news-item.featured {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-left-color: #0ea5e9;
}

.news-date {
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.news-item h3 {
    color: #1a202c;
    margin-bottom: 15px;
    font-size: 1.3rem;
}

.news-item p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 20px;
}

.read-more {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
}

.coverage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.coverage-item {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    text-align: center;
}

.publication {
    font-weight: 800;
    color: #667eea;
    font-size: 1.1rem;
    margin-bottom: 10px;
}

.coverage-item h4 {
    color: #1a202c;
    margin-bottom: 10px;
    font-size: 1rem;
}

.coverage-date {
    color: #64748b;
    font-size: 0.9rem;
}

.kit-resources {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.resource-item {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
}

.resource-item h4 {
    color: #667eea;
    margin-bottom: 10px;
}

.resource-item p {
    color: #4a5568;
    margin-bottom: 20px;
}

.download-btn {
    background: #667eea;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
}

.media-contact {
    text-align: center;
}

.contact-info {
    background: #f8fafc;
    padding: 30px;
    border-radius: 12px;
    display: inline-block;
}
</style>

<?php
get_footer('ultra-premium');
?>