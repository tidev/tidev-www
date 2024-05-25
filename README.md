# tidev.io Website

## Dev

	sudo apt-get install openjdk-8-jdk
	pnpm i
	pnpm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

One time:

	git remote add dokku dokku@tisdk.com:tidev.io

Then to release:

	git push dokku main

## Blog Posts

Add your markdown blog post in the `posts/<year>` directory. Every post should
have an image. You can generate one for free at
https://socialbu.com/tools/generate-blog-image.

Include the image size in the prompt like this:

```
black background with futurist terminal vibe 640x320
```

## CLA

This site contains the Contributor License Agreement (CLA) form. The PDF is
signed using the tidev.io SSL cert issued by GoDaddy. Adobe Acrobat includes
hundreds of trusted certificates and GoDaddy isn't one of them. In order to
verify the signed CLA's signature, you need to manually add the GoDaddy
certificate bundle to Acrobat. It can be downloaded from
https://certs.godaddy.com/repository/gd_bundle-g2.crt.
