package com.web.persistence;

import org.springframework.data.repository.CrudRepository;

import com.web.domain.Guide;


public interface GuideRepository extends CrudRepository<Guide, Long>{

}
