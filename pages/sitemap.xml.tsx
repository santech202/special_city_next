// const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

import {NextApiResponse} from "next";
import {PostInterface} from "types";
import {getDynamicPaths} from "utils/getDynamicPaths";

function generateSiteMap(posts: PostInterface[]) {
    // <!--We manually set the two URLs we know already-->
    // <url>
    //     <loc>https://jsonplaceholder.typicode.com</loc>
    // </url>
    // <url>
    //     <loc>https://jsonplaceholder.typicode.com/guide</loc>
    // </url>
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
        .map(({slug}) => {
            return `
       <url>
           <loc>${`${process.env.NEXT_PUBLIC_APP_URL}/posts/${slug}`}</loc>
       </url>
     `;
        })
        .join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({res}: { res: NextApiResponse }) {
    // We make an API call to gather the URLs for our site
    // const request = await fetch(EXTERNAL_DATA_URL);
    const posts: PostInterface[] = await getDynamicPaths(5000)
    // const posts = await request.json();

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;