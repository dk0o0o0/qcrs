package com.linkus.capital.util.config;


import org.ironrhino.core.sequence.CyclicSequence;
import org.ironrhino.core.sequence.CyclicSequence.CycleType;
import org.ironrhino.core.sequence.SimpleSequence;
import org.ironrhino.core.sequence.cyclic.DatabaseCyclicSequenceDelegate;
import org.ironrhino.core.sequence.simple.DatabaseSimpleSequenceDelegate;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {

	@Bean(autowire = Autowire.BY_NAME)
	public SimpleSequence roleIdSequence() {
		//改成 simple
		DatabaseSimpleSequenceDelegate dc = new DatabaseSimpleSequenceDelegate();
		dc.setPaddingLength(10);
		return dc;
	}
	
	@Bean(autowire = Autowire.BY_NAME)
	public SimpleSequence examtrack() {
		//改成 simple
		DatabaseSimpleSequenceDelegate dc = new DatabaseSimpleSequenceDelegate();
		dc.setPaddingLength(18);
		return dc;
	}
	
	@Bean(autowire = Autowire.BY_NAME)
	public CyclicSequence billBasicSequence() {
	    DatabaseCyclicSequenceDelegate cyclicSequence = new DatabaseCyclicSequenceDelegate();
	    cyclicSequence.setSequenceName("billBasicSequence");
	    return cyclicSequence;
	}

	@Bean(autowire = Autowire.BY_NAME)
	public CyclicSequence exuuId() {
		DatabaseCyclicSequenceDelegate dc = new DatabaseCyclicSequenceDelegate();
		dc.setCycleType(CycleType.DAY);
		dc.setPaddingLength(8);
		return dc;
	}
	@Bean(autowire = Autowire.BY_NAME)
	public CyclicSequence flowId() {
		DatabaseCyclicSequenceDelegate dc = new DatabaseCyclicSequenceDelegate();
		dc.setCycleType(CycleType.DAY);
		dc.setPaddingLength(4);
		return dc;
	}
	
	@Bean(autowire = Autowire.BY_NAME)
	public CyclicSequence empowId() {
		DatabaseCyclicSequenceDelegate dc = new DatabaseCyclicSequenceDelegate();
		dc.setCycleType(CycleType.DAY);
		dc.setPaddingLength(2);
		return dc;
	}
	@Bean(autowire = Autowire.BY_NAME)
	public CyclicSequence holidayId() {
		DatabaseCyclicSequenceDelegate dc = new DatabaseCyclicSequenceDelegate();
		dc.setCycleType(CycleType.DAY);
		dc.setPaddingLength(2);
		return dc;
	}
	
	@Bean(autowire = Autowire.BY_NAME)
	public CyclicSequence packId() {
		DatabaseCyclicSequenceDelegate dc = new DatabaseCyclicSequenceDelegate();
		dc.setCycleType(CycleType.DAY);
		dc.setPaddingLength(4);
		return dc;
	}	
	
    @Bean(autowire = Autowire.BY_NAME)
    public SimpleSequence mappingIdSequence() {
        //改成 simple
        DatabaseSimpleSequenceDelegate dc = new DatabaseSimpleSequenceDelegate();
        dc.setPaddingLength(10);
        return dc;
    }
    
    /** documentNoSequence使用的序列。 */
    @Bean(autowire = Autowire.BY_NAME)
    public CyclicSequence documentNoSequence() {
        DatabaseCyclicSequenceDelegate cyclicSequence = new DatabaseCyclicSequenceDelegate();
        cyclicSequence.setSequenceName("documentNoSequence");
        return cyclicSequence;
    }
}


