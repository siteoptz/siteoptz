<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'siteoptz'); ?></a>

    <header id="masthead" class="site-header">
        <div class="container">
            <div class="site-branding">
                <?php if (has_custom_logo()) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <h1 class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a></h1>
                    <?php $description = get_bloginfo('description', 'display'); ?>
                    <?php if ($description || is_customize_preview()) : ?>
                        <p class="site-description"><?php echo $description; ?></p>
                    <?php endif; ?>
                <?php endif; ?>
            </div>

            <nav id="site-navigation" class="main-navigation">
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                    <?php esc_html_e('Menu', 'siteoptz'); ?>
                </button>
                <?php
                wp_nav_menu([
                    'theme_location' => 'primary',
                    'menu_id' => 'primary-menu',
                    'menu_class' => 'nav-menu',
                ]);
                ?>
            </nav>
        </div>
    </header>