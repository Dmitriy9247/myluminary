import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { storjImage } from '~/server/StorjService';
import ALink from '~/components/features/custom-link';

function PostTwo ( props ) {
    const { post, adClass = '', isLazy = false } = props;

    return (
        <div className={ `post post-list-sm ${ adClass }` }>
            <figure className="post-media">
                {
                    isLazy ?
                        <ALink href={ `/blog/single/${ post.slug }` }>
                            <LazyLoadImage
                                src={ storjImage(post.main_image.bucket, post.main_image.key) }
                                alt="post image"
                                width={ 100 }
                                height={ 100 }
                                effect="opacity"
                                style={ { backgroundColor: "#DEE6E8" } }
                            />
                        </ALink>
                        :
                        <ALink href={ `/blog/single/${ post.slug }` }>
                            <img
                                src={ storjImage(post.main_image.bucket, post.main_image.key) }
                                alt="post image"
                                width={ 100 }
                                height={ 100 }
                            />
                        </ALink>
                }
            </figure>

            <div className="post-details">
                <div className="post-meta">
                    <ALink href="#" className="post-date">{ new Date( Number(post.createdAt) ).toLocaleDateString( 'en-US', { year: 'numeric', month: 'short', day: "2-digit", timeZone: "UTC" } ) }</ALink>
                </div>
                <h4 className="post-title">
                    <ALink href={ `/blog/single/${ post.slug }` }>{ post.title }</ALink>
                </h4>
            </div>
        </div >
    )
}

export default PostTwo;