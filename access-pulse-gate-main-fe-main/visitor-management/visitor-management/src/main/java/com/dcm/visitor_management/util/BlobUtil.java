package com.dcm.visitor_management.util;

//package com.ioc.complaintms.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.sql.Blob;
import java.util.Base64;

public class BlobUtil {

    public static String blobToBase64(Blob blob) {
        if (blob == null) {
            return null; // Handle null blob
        }

        try {
            byte[] bytes = blob.getBytes(1, (int) blob.length());
            return Base64.getEncoder().encodeToString(bytes);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Handle exception as needed
        }
    }
}

