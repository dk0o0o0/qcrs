package com.linkus.sys.auth.model;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.common.model.Coordinate;
import org.ironrhino.common.util.LocationUtils;
import org.ironrhino.core.aop.PublishAware;
import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.FullnameSeperator;
import org.ironrhino.core.metadata.NotInCopy;
import org.ironrhino.core.model.BaseTreeableEntity;
import org.ironrhino.core.search.elasticsearch.annotations.Index;
import org.ironrhino.core.search.elasticsearch.annotations.Searchable;
import org.ironrhino.core.search.elasticsearch.annotations.SearchableProperty;
import org.ironrhino.core.util.StringUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;

@PublishAware
@AutoConfig
@Searchable
@Entity
@Table(name = "dept")
@FullnameSeperator(independent = false, seperator = "")
public class Dept extends BaseTreeableEntity<Dept> {

	private static final long serialVersionUID = 8878381261391688086L;

	private String fullname;

	@Column(length = 6)
	private String areacode;

	@Column(length = 6)
	private String postcode;

	private Integer rank;

	@Embedded
	private Coordinate coordinate;

	public Dept() {

	}

	public Dept(String name) {
		this.name = name;
	}

	public Dept(String name, int displayOrder) {
		this.name = name;
		this.displayOrder = displayOrder;
	}

	public String getAreacode() {
		return areacode;
	}

	public void setAreacode(String areacode) {
		this.areacode = areacode;
	}

	@Override
	@NotInCopy
	@SearchableProperty(boost = 2)
	@Access(AccessType.PROPERTY)
	public String getFullname() {
		if (fullname == null)
			fullname = super.getFullname();
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	@Override
	public void setParent(Dept parent) {
		super.setParent(parent);
		if (this.fullname != null)
			this.fullname = super.getFullname();
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public Integer getRank() {
		return rank;
	}

	public void setRank(Integer rank) {
		this.rank = rank;
	}

	public Coordinate getCoordinate() {
		return coordinate;
	}

	public void setCoordinate(Coordinate coordinate) {
		this.coordinate = coordinate;
	}

	@JsonIgnore
	@SearchableProperty(boost = 3, index = Index.NOT_ANALYZED)
	public String getNameAsPinyin() {
		return StringUtils.pinyin(name);
	}

	@JsonIgnore
	@SearchableProperty(boost = 3, index = Index.NOT_ANALYZED)
	public String getNameAsPinyinAbbr() {
		return StringUtils.pinyinAbbr(name);
	}

	@JsonIgnore
	@SearchableProperty(boost = 3, index = Index.NOT_ANALYZED)
	public String getShortFullname() {
		return LocationUtils.shortenAddress(getFullname());
	}

	public Dept getDescendantOrSelfByAreacode(String areacode) {
		if (areacode == null)
			throw new IllegalArgumentException("areacode must not be null");
		if (areacode.equals(this.getAreacode()))
			return this;
		for (Dept t : getChildren()) {
			if (areacode.equals(t.getAreacode())) {
				return t;
			} else {
				Dept tt = t.getDescendantOrSelfByAreacode(areacode);
				if (tt != null)
					return tt;
			}
		}
		return null;
	}

}
