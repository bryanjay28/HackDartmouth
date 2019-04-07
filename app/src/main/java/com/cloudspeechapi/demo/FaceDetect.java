package com.cloudspeechapi.demo;

import android.os.AsyncTask;

import java.net.URL;
import java.net.URLConnection;
import java.net.HttpURLConnection;
import java.io.IOException;
import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import android.os.StrictMode;



public class FaceDetect {

    private static final String TARGET_URL = "https://vision.googleapis.com/v1/images:annotate?";
    private static final String API_KEY = "key=AIzaSyAeEtSZrNxAmbjUdWURfFceq0BzAEJs9oA";

    public FaceDetect(){
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);
    }

    public String postImage(byte[] imgByteArr) throws IOException {
        String imgByteString = new String(imgByteArr);
        URL serverUrl = new URL(TARGET_URL + API_KEY);
        URLConnection urlConnection = serverUrl.openConnection();
        HttpURLConnection httpConnection = (HttpURLConnection) urlConnection;

        httpConnection.setRequestMethod("POST");
        httpConnection.setRequestProperty("Content-Type", "application/json");
        httpConnection.setDoOutput(true);

        BufferedWriter httpRequestBodyWriter = new BufferedWriter(new OutputStreamWriter(httpConnection.getOutputStream()));
        httpRequestBodyWriter.write("{\"requests\":[{\"image\":{\"content\":" + imgByteString + "},\"features\":[{\"type\":\"FACE_DETECTION\"}]}]}\n");
        httpRequestBodyWriter.close();

        String response = httpConnection.getResponseMessage();

        if (httpConnection.getInputStream() == null) {
            return "404";
        }

        return response;
    }
}