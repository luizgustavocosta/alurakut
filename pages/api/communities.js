//BFF
import {SiteClient} from 'datocms-client';

export default async function handle(request, response) {

  if ('POST' === request.method) {
    const client = new SiteClient(process.env.DATO_CMS_WRITE_TOKEN);

    const record = await client.items.create({
      itemType: '975964', //Fixed value - Don't change
      ...request.body
    })
    response.json({
      created: record
    })
    return;
  }
  response.status(404).json({
    message: 'Nothing to GET, use POST instead'
  })
}