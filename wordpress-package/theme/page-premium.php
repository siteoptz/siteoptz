<?php
/**
 * Template Name: Premium Page
 * Description: Page template with premium header and footer
 *
 * @package SiteOptz_Premium
 */

// Get the premium header
get_header('premium');
?>

<main id="primary" class="site-main">
    <?php
    while (have_posts()) :
        the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <div class="container">
                <header class="entry-header">
                    <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                </header>

                <div class="entry-content">
                    <?php
                    the_content();
                    
                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('Pages:', 'siteoptz-premium'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>
            </div>
        </article>
    <?php endwhile; ?>
</main>

<?php
// Get the premium footer
get_footer('ultra-premium');
?>