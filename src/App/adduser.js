import React from "react";

class RentBill extends React.Component {
    constructor(props) {

        super(props);
    }
    onRentBill = () => {
        window.print();
    }

    render() {
        return (

            <div class="content-body col-md-12 p-5">
                <section class="card">
                    <div id="invoice-template" class="card-body">
                        <div class="invoice-company-header">
                            <div>Bill Receipt</div>
                        </div>
                        <div id="invoice-customer-details col-md-12 col-sm-12" class="row pt-2">
                            <div class="col-md-6 col-sm-6 text-center text-md-left">
                                <ul class="px-0 list-unstyled">
                                    <li class="text-bold-800">Mr. Bret Lezama</li>
                                    <li>4879 Westfall Avenue,</li>
                                    <li>Albuquerque,</li>
                                    <li>New Mexico-87102.</li>
                                </ul>
                            </div>
                            <div class="col-md-6 col-sm-6 text-center text-md-right">
                                <table className='recipt-column'>
                                    <tr>
                                        <td className="column-left">Bill Date</td>
                                        <td>06/05/2016</td>
                                    </tr>
                                    <tr>
                                        <td className="column-left">Terms</td>
                                        <td>Due on Receipt</td>
                                    </tr>
                                    <tr>
                                        <td className="column-left">Due Date</td>
                                        <td>10/05/2016</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div id="invoice-items-details" class="pt-2">
                            <div class="row">
                                <div class="table-responsive col-sm-12">
                                    <table class="recipt-details-table">
                                        <thead>
                                            <tr>
                                                <th>Receipt No</th>
                                                <th>Item &amp; Description</th>
                                                <th class="text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="row">1</td>
                                                <td>
                                                    <p>Create PSD for mobile APP</p>
                                                    <p class="text-muted">Simply dummy text of the printing and typesetting industry.</p>
                                                </td>

                                                <td class="text-right">$ 2400.00</td>
                                            </tr>
                                            <tr>
                                                <td scope="row">2</td>
                                                <td>
                                                    <p>iOS Application Development</p>
                                                    <p class="text-muted">Pellentesque maximus feugiat lorem at cursus.</p>
                                                </td>

                                                <td class="text-right">$ 6500.00</td>
                                            </tr>
                                            <tr>
                                                <td scope="row">3</td>
                                                <td>
                                                    <p>WordPress Template Development</p>
                                                    <p class="text-muted">Vestibulum euismod est eu elit convallis.</p>
                                                </td>

                                                <td class="text-right">$ 6000.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="payment-mode col-sm">
                                    <p class="lead">Payment Methods:</p>
                                    <table class="table table-borderless table-sm">
                                        <tbody>
                                            <tr>
                                                <td>Bank name:</td>
                                                <td>ABC Bank, USA</td>
                                            </tr>
                                            <tr>
                                                <td>Acc name:</td>
                                                <td>Amanda Orton</td>
                                            </tr>
                                            <tr>
                                                <td>IBAN:</td>
                                                <td>FGS165461646546AA</td>
                                            </tr>
                                            <tr>
                                                <td>SWIFT code:</td>
                                                <td>BTNPP34</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="payment-mode col-sm">
                                    <p class="lead">Total due</p>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>Sub Total</td>
                                                <td>$ 14,900.00</td>
                                            </tr>
                                            <tr>
                                                <td>TAX (12%)</td>
                                                <td>$ 1,788.00</td>
                                            </tr>
                                            <tr>
                                                <td class="text-bold-800">Total</td>
                                                <td class="text-bold-800"> $ 16,688.00</td>
                                            </tr>
                                            <tr>
                                                <td>Payment Made</td>
                                                <td class="pink">(-) $ 4,688.00</td>
                                            </tr>
                                            <tr class="bg-grey bg-lighten-4">
                                                <td class="text-bold-800">Balance Due</td>
                                                <td class="text-bold-800">$ 12,000.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="">
                                        <p>Authorized person</p>
                                        {/* <img src="../../../app-assets/images/pages/signature-scan.png" alt="signature" class="height-100"/> */}
                                        <h6>Amanda Orton</h6>
                                        <p class="text-muted">Managing Director</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center">
                    <button className="ui primary button  btn-sm m-1 osw-print" onClick={this.onRentBill}>Print</button>
                </div>
            </div>

        );
    }
};


export default RentBill
