package nodomain.stswoon.financemanager.backend.config;

import nodomain.stswoon.financemanager.backend.BackendApplication;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.PriorityOrdered;

import static nodomain.stswoon.financemanager.backend.BackendApplication.applicationContext;

@Configuration
public class PreInitializer implements BeanPostProcessor, PriorityOrdered {
    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
    static boolean flag = false;

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        if (!flag && bean.getClass().getName().contains("stswoon")) {
            flag = true;
            bean.
            applicationContext.getBean(ApplicationProperties.class);
        }


        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        return bean;
    }
//    @Override
//    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
//        //Object bean = beanFactory.getBean(ApplicationProperties.class);
////        beanFactory.autowireBean(bean);
//        //beanFactory.autowireBeanProperties(bean, 0, true);
//        //beanFactory.createBean(ApplicationProperties.class);
////        beanFactory.initializeBean(bean,bean.getClass().getSimpleName());
//        //beanFactory.createBean(ApplicationProperties.class, 0, true).;
//        //ApplicationProperties.
//        int x = 0;
//    }
}
