package com.web.persistence;

import org.springframework.data.repository.CrudRepository;

import com.web.domain.CharacterGuide;

public interface CharacterRepository extends CrudRepository<CharacterGuide, Long>{

}
