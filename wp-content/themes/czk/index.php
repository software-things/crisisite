<?php get_header() ?>
<?php the_post() ?>
    <div class="row">
        <div class="columns large-3">
            <nav>
                <span>navigation</span>
            </nav>
        </div>
        <div class="columns large-9">
            <h1><?php the_title() ?></h1>
            <?php the_post_thumbnail('full') ?>
            <?php the_content() ?>
        </div>
    </div>
<?php get_footer() ?>