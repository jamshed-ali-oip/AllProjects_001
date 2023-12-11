export default function invoice(data,user){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>DotNetTec - Invoice html template bootstrap</title>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.css'>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Invoice
                    <strong>${new Date(data.created_at).toDateString()}</strong>
    
                </div>
                <div class="card-body">
                    <div class="row mb-4">
                        <div class="col-sm-12">
                            <h6 class="mb-3">To:</h6>
                            <div>
                                <strong>${user?.name}</strong>
                            </div>
                            <div>Email: ${user?.email}</div>
                            <div>Phone: ${user?.phone}</div>
                        </div>
                    </div>
    
                    <div class="table-responsive-sm">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th class="center">#</th>
                                    <th>Item</th>
                                    <th>Description</th>
    
                                    <th class="right">Unit Cost</th>
                                    <th class="center">Qty</th>
                                    <th class="right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="center">1</td>
                                    <td class="left strong">${data.services[0]?.services_name}</td>
                                    <td class="left">${data.services[0]?.services_desc}</td>
    
                                    <td class="right">$${ data?.get_services_prvider_price?.filter(it=>it.service_id==data?.services[0].id)[0]?.price}</td>
                                    <td class="center">1</td>
                                    <td class="right">$${ data?.get_services_prvider_price?.filter(it=>it.service_id==data?.services[0].id)[0]?.price}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-sm-5">
    
                        </div>
    
                        <div class="col-lg-4 col-sm-5 ml-auto">
                            <table class="table table-clear">
                                <tbody>
                                    <tr>
                                        <td class="left">
                                            <strong>Total</strong>
                                        </td>
                                        <td class="right">
                                            <strong>$${ data?.get_services_prvider_price?.filter(it=>it.service_id==data?.services[0].id)[0]?.price}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>`
}