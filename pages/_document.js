import Document, { Html, Head, Main, NextScript } from "next/document";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {
	setGoogleTags() {
		if (publicRuntimeConfig.PRODUCTION) {
			return {
				__html: `
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
			  
				gtag('config', 'UA-160851241-1');
				`
			};
		}
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css"
					/>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
					/>
					<link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>
					<link rel="stylesheet" href="/css/styles.css" />
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=UA-160851241-1"
					></script>
					<script dangerouslySetInnerHTML={this.setGoogleTags()} />
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
