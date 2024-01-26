package com.web.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
 CREATE TABLE POINTSTORE(
 PRODUCT_NUMBER NUMBER(10) CONSTRAINT PRODUCT_NUMBER_PK PRIMARY KEY,	--상품번호
 PRODUCT_NAME VARCHAR2(20) NOT NULL,									--상품이름
 PRODUCT_IMAGE VARCHAR2(100) NOT NULL,									--상품이미지
 PRODUCT_POINT NUMBER(10) DEFAULT 0 NOT NULL,							--상품포인트(가격)
 PRODUCT_INVENTORY NUMBER(10) DEFAULT 0 NOT NULL						--상품재고
 PRODUCT_ADMIN_ID VARHCAR2(20) CONSTRAINT POINTSTORE_ADID_FK FOREIGN KEY--관리자아이디
);
 */

@Getter
@Setter
@ToString
@Entity
@Table(name="PRODUCT_TB")
public class PointShop {

	@Id
	@GeneratedValue
	@Column(name="PRODUCT_NUMBER")
	private Long productNumber;
	@Column(name="PRODUCT_NAME")
	private String productName;
	@Column(name="PRODUCT_IMAGE")
	private String productImage;
	@Column(name="PRODUCT_CONTENTS")
	private String productContents;
	@Column(name="PRODUCT_POINT")
	private int productPoint;
	@Column(name="PRODUCT_INVENTORY")
	private int productInventory;
	@Column(name="PRODUCT_ADMIN_ID")
	private String adminId;
	
	
}
