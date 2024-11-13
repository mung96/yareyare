package yare.yare.domain.history.service;

import yare.yare.domain.history.dto.request.PurchaseHistoryAddReq;
import yare.yare.domain.history.dto.response.PurchaseHistoryAddRes;

public interface PurchaseHistoryService {
    PurchaseHistoryAddRes addPurchaseHistory(PurchaseHistoryAddReq purchaseHistoryAddReq, String memberUuid);

}

