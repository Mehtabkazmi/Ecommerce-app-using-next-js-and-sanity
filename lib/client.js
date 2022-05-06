import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: 'rcawu311',
  dataset: 'production',
  apiVersion: '2022-05-06',
  useCdn: true,
  token: "skiaPntskj0FJ7RrdqQlNkWDLupSsEsLGgMULRRypiKEQlXvM434WtiC35iibJscpovgq3wmeGs3pRv2UfUaS6ZnNngClwbBMpMKWZNA8jPRlMSH6nYUgoN4zydfgNDQgaHaVEYOVPZmPDIfafoL8qbiWAUzYKpJ7O11pC0uWgVWTQ9fX0FA"
});
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);