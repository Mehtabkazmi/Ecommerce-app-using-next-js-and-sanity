import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: 'rcawu311',
  dataset: 'production',
  apiVersion: '2022-05-05',
  useCdn: true,
  token: "ska9WMBoCPA5XthjpBULpHY06qq9xhNscJISHhfgXrno3em0NmfrmhYXy5zxJRyTmVT0e201DPJmEiN6fgLgHDDB5qXtjViTPyKnzb2DKgc0cVmFya1BtbouG0OqqFLNazw5zsgpklZ1QUwOkLUZUK5seZwBj1aETGfnvvsKsECMWYm5yRAu"
});
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);