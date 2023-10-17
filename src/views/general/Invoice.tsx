import Button from "core/components/button/Button";
import { formatCurrency, getDate } from "core/services/helpers";
import useSaleStore from "core/services/stores/useSaleStore";
import { useEffect } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { useParams } from "react-router-dom";

export default function Invoice() {
  const { invoiceId } = useParams();
  const getSaleAction = useSaleStore((state) => state.getSalesById);
  const sale: any = useSaleStore((state) => state.sale);

  const printReceipt = () => {
    const titleBefore = document.title;
    document.title = `${sale?.billType}-${sale?.code}`;
    window.print();
    document.title = titleBefore;
  };

  useEffect(() => {
    if (sale == null || sale?.code != invoiceId) {
      getSaleAction(invoiceId);
    }
  }, []);

  // TODO: Custom search for invoice

  return (
    <div className="fixed left-0 top-0 z-10 flex w-full flex-col flex-wrap content-center justify-center gap-4 p-24">
      {sale != null ? (
        <>
          <div id="receipt" className="z-10 w-[350px] overflow-hidden bg-white">
            <div className="w-full overflow-auto p-6 text-left text-sm">
              <div className="text-center">
                {/*
                     <img
                       src="img/receipt-logo.png"
                       alt="Tailwind POS"
                       className="mb-3 inline-block h-8 w-8"
                     /> */}
                <h2 className="text-xl font-semibold">
                  {sale?.store?.storeName}
                </h2>
                <p>{sale?.store?.address}</p>
                <p className="text-xs">
                  {sale?.store.email} | {sale?.store?.phone}
                </p>
              </div>
              <div className="mt-4 flex text-xs">
                <div className="flex-grow">
                  {sale?.billType} No:{" "}
                  <span className="font-bold">{sale?.code}</span>
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
                      <th className="w-2/12 py-1 text-center">Qty</th>
                      <th className="w-3/12 py-1 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sale?.carts != null &&
                      sale?.carts?.length > 0 &&
                      sale?.carts?.map((cart: any) => (
                        <tr>
                          <td
                            className="py-2 text-center"
                            x-text="index+1"
                          ></td>
                          <td className="py-2 text-left">
                            <span>{cart?.productName}</span>
                            <br />
                            <small>
                              {formatCurrency(cart?.unitPriceAtPurchase)}
                            </small>
                          </td>
                          <td className="py-2 text-center">{cart?.quantity}</td>
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
                  <div className="flex-grow">PAYMENT MODE</div>
                  <div>{sale?.paymentMethod}</div>
                </div>
                <div className="flex text-xs font-semibold">
                  <div className="flex-grow">STATUS</div>
                  <div>{sale?.status}</div>
                </div>
              </div>
              <hr className="my-2" />
              <p className="mt-5 text-center text-xs">
                ©{new Date().getFullYear()} Inventory Hub. All Rights Reserved
              </p>
            </div>
          </div>
          <Button
            style={`flex gap-1 m-0 h-[50px] justify-center items-center bg-brand-500 hover:bg-brand-600 dark:text-white-300 hide-print`}
            hidden={sale == null}
            onClick={() => printReceipt()}
          >
            <AiFillPrinter />
            <span>Print</span>
          </Button>
        </>
      ) : (
        <p>No record found for invoice provided</p>
      )}
    </div>
  );
}
