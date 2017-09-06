package nodomain.stswoon.financemanager.auth.config;

import nodomain.stswoon.financemanager.auth.users.UserEntity;
import nodomain.stswoon.financemanager.auth.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = repository.findByLogin(username).get(0); //todo

        if (userEntity == null) {
            throw new UsernameNotFoundException(username);
        }

        Collection<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ALL"));
        User user = new User(userEntity.getLogin(), userEntity.getPassword(), authorities);

        return user;
    }
}
