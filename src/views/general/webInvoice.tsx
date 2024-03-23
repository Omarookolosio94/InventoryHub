import Button from "core/components/button/Button";
import { InvoiceSize } from "core/const/const";
import { formatCurrency, getDate } from "core/services/helpers";
import useSaleStore from "core/services/stores/useSaleStore";
import { useEffect } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { useParams } from "react-router-dom";

export default function WebInvoice() {
  const { employerId, invoiceId, size } = useParams();
  const getSaleAction = useSaleStore((state) => state.getWebsaleById);
  const sale = useSaleStore((state) => state.webSale);

  const printReceipt = () => {
    const titleBefore = document.title;
    document.title = `${sale?.customerName}-${sale?.code}`;
    window.print();
    document.title = titleBefore;
  };

  useEffect(() => {
    if (sale == null || sale?.code != invoiceId) {
      getSaleAction(employerId, invoiceId);
    }
  }, []);

  return (
    <div className="left-0 top-0 z-10 flex w-full flex-col flex-wrap content-center justify-center gap-4 p-24">
      {sale != null ? (
        <>
          <Button
            style={`flex gap-1 m-0 w-[350px] h-[50px] justify-center items-center bg-brand-500 hover:bg-brand-600 dark:text-white-300 hide-print`}
            hidden={sale == null}
            onClick={() => printReceipt()}
          >
            <AiFillPrinter />
            <span>Print</span>
          </Button>
          <div
            id="receipt"
            style={{ height: "auto" }}
            className={`z-10 bg-white ${
              size === InvoiceSize.LARGE ? "w-11/12" : "w-[350px]"
            }`}
          >
            <div className="w-full overflow-auto p-6 text-left text-sm">
              <div className="text-center">
                {/*
                     <img
                       src="img/receipt-logo.png"
                       alt="Tailwind POS"
                       className="mb-3 inline-block h-8 w-8"
                     /> */}
                <h2 className="text-xl font-semibold">
                  {sale?.employer?.name}
                </h2>
                <p>{sale?.employer?.headOfficeAddress}</p>
                <p className="text-xs">
                  {sale?.employer?.email} | {sale?.employer?.contactLine}
                </p>
              </div>
              <div className="mt-4 flex text-xs">
                <div className="flex-grow">
                  No: <span className="font-bold">{sale?.code}</span>
                  <br />
                  {sale?.customerName !== "Anonymous" && (
                    <span>CUSTOMER: {sale?.customerName}</span>
                  )}
                </div>
                <span>{getDate(sale?.dateAdded, true, true)}</span>
              </div>
              <hr className="my-2" />
              <div>
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="w-1/12 py-1 text-center">#</th>
                      <th className="py-1 text-left">Item</th>
                      <th className="w-2/12 py-1 text-center">Unit</th>
                      <th className="w-2/12 py-1 text-center">Qty</th>
                      <th className="w-3/12 py-1 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sale?.cart != null &&
                      sale?.cart?.length > 0 &&
                      sale?.cart?.map((cart, index: number) => (
                        <tr>
                          <td className="py-2 text-center">{index + 1}</td>
                          <td className="py-2 text-left">
                            <span>{cart?.productName}</span>
                            <br />
                            <small>
                              {formatCurrency(cart?.unitPriceAtPurchase)}
                            </small>
                          </td>
                          <td className="py-2 text-center">
                            <span>
                              {cart?.unit?.length > 1 ? cart?.unit : "-"}
                            </span>
                          </td>
                          <td className="py-2 text-center">
                            <span>{cart?.quantity}</span>
                            <br />
                            <small>{cart?.quantityNarration}</small>
                          </td>
                          <td className="py-2 text-right">
                            {" "}
                            {formatCurrency(
                              cart?.unitPriceAtPurchase * cart?.quantity
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <hr className="my-2" />
              <div>
                <div className="flex text-xs font-semibold">
                  <div className="flex-grow">CART TOTAL</div>
                  <div> {formatCurrency(sale?.cartTotal)}</div>
                </div>
                <div className="flex text-xs font-semibold">
                  <div className="flex-grow">TAX</div>
                  <div> {formatCurrency(sale?.tax)}</div>
                </div>
                <div className="flex text-xs font-semibold">
                  <div className="flex-grow">DELIVERY FEE</div>
                  <div> {formatCurrency(sale?.deliveryFee)}</div>
                </div>
                <hr className="my-2" />

                <div className="flex font-semibold">
                  <div className="flex-grow">TOTAL</div>
                  <div>
                    <span>{formatCurrency(sale?.totalPaid)}</span>
                  </div>
                </div>
                <hr className="my-2" />
                <div className="flex text-xs font-semibold">
                  <div className="flex-grow">DELIVERY MODE</div>
                  <div>{sale?.deliveryMethod}</div>
                </div>

                <div className="flex text-xs font-semibold">
                  <div className="flex-grow">STATUS</div>
                  <div>{sale?.status}</div>
                </div>
                <hr className="my-2" />
                {size === InvoiceSize.LARGE && (
                  <>
                    <div className="flex text-xs font-semibold">
                      <div className="flex-grow">SALES PLATFORM</div>
                      <div>Store Front</div>
                    </div>
                    <hr className="my-5" />
                    <div className="flex text-xs font-semibold">
                      <div className="mb-3 flex-grow font-normal">
                        *For Customer only
                      </div>
                      <div></div>
                    </div>
                    <div className="mb-3 flex text-xs font-semibold">
                      <div className="flex-grow">NAME:</div>
                      <div></div>
                    </div>
                    <div className="mb-3 flex text-xs font-semibold">
                      <div className="flex-grow">SIGNATURE:</div>
                      <div></div>
                    </div>
                    <hr className="my-5" />
                    <div className="flex text-xs font-semibold">
                      <div className="mb-3 flex-grow font-normal">
                        *For Inventory Officer only
                      </div>
                      <div></div>
                    </div>
                    <div className="mb-3 flex text-xs font-semibold">
                      <div className="flex-grow">NAME:</div>
                      <div></div>
                    </div>
                    <div className="mb-3 flex text-xs font-semibold">
                      <div className="flex-grow">SIGNATURE:</div>
                      <div></div>
                    </div>
                  </>
                )}
              </div>
              <hr className="mb-2 mt-5" />
            </div>
          </div>
        </>
      ) : (
        <p>No record found for invoice provided</p>
      )}
    </div>
  );
}
