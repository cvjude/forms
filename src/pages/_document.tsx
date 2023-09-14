/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: any): Promise<any> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link
            rel="preload"
            as="image"
            href="https://ik.imagekit.io/gk81krdud/home/banner-1-lg.png?tr=w-1256,h-502"
          /> */}
          <meta name="theme-color" content="#294C6F" />
          <meta
            httpEquiv="Content-Security-Policy"
            content="img-src *; child-src 'none';"
          ></meta>

          <meta
            name="google-site-verification"
            content="LUOViGK3MVKK11fbWkV3vrrPRJDU2iQJjo3FfLEadQM"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
