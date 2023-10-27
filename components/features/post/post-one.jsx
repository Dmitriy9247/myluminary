import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { storjImage } from '~/server/StorjService';
import { videoHandler } from '~/utils';
import { mainSlider20 } from '~/utils/data/carousel';

function PostOne ( props ) {
    const { post, adClass = 'mb-7', isLazy = false, isOriginal = false, btnText = "Read more", btnAdClass = '', isButton = true } = props;
    return (
        <div className={ `post post-classic ${ post.postType === 'video' ? 'post-video' : '' } ${ adClass }` }>
            {
                post.postType === 'image' || post.postType === 'video' ?
                    <figure className={ `post-media ${ post.postType === 'image' ? 'overlay-zoom' : '' }` }>
                        {
                            isLazy ?
                                <ALink href={ `/blog/single/${ post.slug }` }>
                                    {
                                        isOriginal ? <LazyLoadImage
                                            src={ storjImage(post.main_image.bucket, post.main_image.key) }
                                            alt="post image"
                                            width={ 100 }
                                            height={ 100 }
                                            effect="opacity; transform"
                                            style={ { backgroundColor: "#DEE6E8" } }
                                        />
                                            :
                                            <LazyLoadImage
                                                src={ storjImage(post.main_image.bucket, post.main_image.key) }
                                                alt="post image"
                                                width={ 100 }
                                                height={ 100 }
                                                effect="opacity; transform"
                                                style={ { backgroundColor: "#DEE6E8" } }
                                            />
                                    }
                                </ALink>
                                :
                                <ALink href={ `/blog/single/${ post.slug }` }>
                                    {
                                        isOriginal ? <img
                                            src={ storjImage(post.main_image.bucket, post.main_image.key) }
                                            alt="post image"
                                            width={ 100 }
                                            height={ 100 }
                                        /> :

                                            <img
                                                src={ storjImage(post.main_image.bucket, post.main_image.key) }
                                                alt="post image"
                                                width={ 100 }
                                                height={ 100 }
                                            />
                                    }
                                </ALink>
                        }
                        {
                            post.type === 'video' ?
                                <>
                                    <span className="video-play" onClick={ videoHandler }></span>
                                    <video width="380">
                                        <source src={ process.env.NEXT_PUBLIC_ASSET_URI + post.video.url } type="video/mp4" />
                                    </video>
                                </>
                                : ''
                        }
                    </figure> :
                    <figure className="post-media">
                        {
                            isLazy ?
                                <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white gutter-no" options={ mainSlider20 }>
                                    {
                                        post.picture.map( ( item, index ) =>
                                            <LazyLoadImage
                                                src={ process.env.NEXT_PUBLIC_ASSET_URI + item.url }
                                                alt="post gallery"
                                                key={ item.title + '-' + index }
                                                width={ 100 }
                                                height={ 100 }
                                                effect="opacity; transform"
                                                style={ { backgroundColor: "#DEE6E8" } }
                                            />
                                        ) }
                                </OwlCarousel>
                                :
                                <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white gutter-no" options={ mainSlider20 }>
                                    {
                                        post.picture.map( ( item, index ) =>
                                            <img
                                                src={ process.env.NEXT_PUBLIC_ASSET_URI + item.url }
                                                alt="post gallery"
                                                key={ item.title + '-' + index }
                                                width={ 100 }
                                                height={ 100 }
                                            />
                                        ) }
                                </OwlCarousel>
                        }
                    </figure>
            }

            <div className="post-details">
                <div className="post-meta">
                    by <ALink href="#" className="post-author">{ post.author }</ALink> on <ALink href="#" className="post-date">{ new Date( Number(post.createdAt) ).toLocaleDateString( 'en-US', { year: 'numeric', month: 'short', day: "2-digit", timeZone: "UTC" } ) }</ALink>
                </div>
                <h4 className="post-title">
                    <ALink href={ `/blog/single/${ post.slug }` }>{ post.title }</ALink>
                </h4>
                <p className="post-content">{ post.content }</p>
                {
                    isButton ?
                        <ALink href={ `/blog/single/${ post.slug }` } className={ `btn btn-link btn-underline btn-primary ${ btnAdClass }` }>{ btnText }<i className="d-icon-arrow-right"></i></ALink>
                        : ''
                }
            </div>
        </div >
    )
}

export default PostOne;