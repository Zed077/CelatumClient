/**
 * HelloService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.celatum.service;

public interface HelloService extends javax.xml.rpc.Service {
    public java.lang.String getHelloAddress();

    public com.celatum.service.Hello getHello() throws javax.xml.rpc.ServiceException;

    public com.celatum.service.Hello getHello(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
