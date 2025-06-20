package com.example.demo.Responses;

import java.util.Date;

public class CustomerResponse {
    private Long id;
    private String name;
    private String desc;
    private float prs;
    private int qty;
    private String ctgry;
    private Date crtd;
    private Date uptd;

    public CustomerResponse(Long id, String name, String desc, float prs, int qty, String ctgry, Date crtd, Date uptd) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.prs = prs;
        this.qty = qty;
        this.ctgry = ctgry;
        this.crtd = crtd;
        this.uptd = uptd;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public float getPrs() {
        return prs;
    }

    public void setPrs(float prs) {
        this.prs = prs;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public String getCtgry() {
        return ctgry;
    }

    public void setCtgry(String ctgry) {
        this.ctgry = ctgry;
    }

    public Date getCrtd() {
        return crtd;
    }

    public void setCrtd(Date crtd) {
        this.crtd = crtd;
    }

    public Date getUptd() {
        return uptd;
    }

    public void setUptd(Date uptd) {
        this.uptd = uptd;
    }
}
