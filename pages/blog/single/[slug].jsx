import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Helmet from 'react-helmet';
import {useState, useEffect} from "react";
import withApollo from '~/server/apolloClient';
import { GET_POST } from '~/server/queries';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import ErrorPage from '~/pages/pages/404';

import BlogSidebar from '~/components/partials/post/blog-sidebar';
import RelatedPosts from '~/components/partials/post/related-posts';

import { mainSlider20 } from '~/utils/data/carousel';
import { videoHandler } from '~/utils';
import { storjImage } from '~/server/StorjService';
function PostSingle() {
    const slug = useRouter().query.slug;

    if ( !slug ) return '';

    const [getPost, { data, loading, error }] = useLazyQuery( GET_POST, { variables: { slug } } );
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log(post);
    useEffect(()=>{
        getPost();
        setPost(data?.post);
        setIsLoading(loading);
    }, [data, loading, error]);
    const related = data && data.post?.related;

    if ( error ) return <ErrorPage />;

    return (
        <main className="main skeleton-body">
            <Helmet>
                <title>{ post?.title }</title>
            </Helmet>

            <h1 className="d-none">{ post?.title }</h1>

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li><ALink href="/blog/classic" className="active">Blog</ALink></li>
                        <li>{ post?.slug }</li>
                    </ul>
                </div>
            </nav>

            <div className="page-content with-sidebar">
                <div className="container">
                    <div className="row gutter-lg">
                        <div className="col-lg-9">
                            {
                                isLoading ?
                                    <div className="skel-post"></div>
                                    :
                                    <div className={ `post post-single ${ post?.postType === 'video' ? 'post-video' : '' }` }>
                                        {
                                            post?.postType === 'image' || post?.postType === 'video' &&
                                                <figure className="post-media">
                                                    <ALink href="#">
                                                        <LazyLoadImage
                                                            src={ post?.main_image?.bucket ? storjImage(post?.main_image?.bucket, post?.main_image?.key) : "" }
                                                            alt="post image"
                                                            style={ { backgroundColor: "#DEE6E8" } }
                                                        />
                                                    </ALink>
                                                    {
                                                        post?.postType === 'video' ?
                                                            <>
                                                                <span className="video-play" onClick={ videoHandler }></span>
                                                                <video width="380">
                                                                    <source src={ process.env.NEXT_PUBLIC_ASSET_URI + post?.video.url } type="video/mp4" />
                                                                </video>
                                                            </>
                                                            : ''
                                                    }
                                                </figure>
                                        }
                                        <LazyLoadImage
                                            src={ post?.main_image?.bucket ? storjImage(post?.main_image?.bucket, post?.main_image?.key) : "" }
                                            alt="post single image"
                                            effect="opacity"
                                            className="float-left"
                                            style={ { backgroundColor: "#DEE6E8" } }
                                        />
                                        <div className="post-details">
                                            <div className="post-meta">
                                                by <ALink href="#" className="post-author">{ post?.author }</ALink> on <ALink href="#" className="post-date">{ new Date( Number(post?.createdAt) ).toLocaleDateString( 'en-US', { year: 'numeric', month: 'short', day: "2-digit", timeZone: "UTC" } ) }</ALink>
                                            </div>
                                            <h4 className="post-title">
                                                <ALink href="#">{ post?.title }</ALink>
                                            </h4>
                                            <div className="post-body mb-7">
                                                <p className="mb-6">{post?.content}</p>
                                            </div>
                                        </div>
                                    </div >
                            }
                            <div className="reply">
                                <div className="title-wrapper text-left">
                                    <h3 className="title title-simple text-left text-normal">Leave A Reply</h3>
                                    <p>Your email address will not be published. Required fields are marked *</p>
                                </div>
                                <form action="#">
                                    <textarea id="reply-message" cols="30" rows="6" className="form-control mb-4" placeholder="Comment *" required></textarea>
                                    <div className="row">
                                        <div className="col-md-6 mb-5">
                                            <input type="text" className="form-control" id="reply-name" name="reply-name" placeholder="Name *" required />
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            <input type="email" className="form-control" id="reply-email" name="reply-email" placeholder="Email *" required />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-rounded">POST COMMENT<i className="d-icon-arrow-right"></i></button>
                                </form>
                            </div>

                        </div>

                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default withApollo( { ssr: typeof window === 'undefined' } )( PostSingle );