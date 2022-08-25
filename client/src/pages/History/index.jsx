import { Pagination, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import useProduct from "../../hooks/product.hook";
import CommonLayout from "../../layouts/commonLayout";
import TableProduct from "./Table";
import "./style.scss";
import ReceiptLayout from "../../layouts/ReceiptLayout";

function History() {
  const { historyProduct } = useProduct();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([1]);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    historyProduct({
      page,
      per_page: 10,
      successCallback: (response) => {
        console.log(response);
        if (response.result?.success) {
          setProducts(response.result.payload?.data);
          setTotalPage(response.result.payload?.total);
        }
      },
    });
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <ReceiptLayout>
      <div className="history_container">
        {products.length>0?<Box>
          <TableProduct data={products} />
        </Box>:<h3>Không tìm thấy hóa đơn nào</h3>}
        <Stack direction="row">
          {totalPage > 1 && (
            <Pagination count={totalPage} color="primary" className="pagina" onChange={handleChangePage} />
          )}
        </Stack>
      </div>
    </ReceiptLayout>
  );
}

export default History;
