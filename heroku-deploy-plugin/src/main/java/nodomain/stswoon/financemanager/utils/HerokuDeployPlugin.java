package nodomain.stswoon.financemanager.utils;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;

import java.io.IOException;

//http://oppansource.com/custom-maven-plugin-hello-world/
//https://stackoverflow.com/questions/20951893/maven-plugin-descriptor-not-getting-generated
@Mojo(name = "deployToHeroku", defaultPhase = LifecyclePhase.INSTALL)
public class HerokuDeployPlugin extends AbstractMojo {
    public void execute() throws MojoExecutionException {
        getLog().info("HerokuDeployPlugin - start");
        try {
            Runtime.getRuntime().exec("cmd /c start \"\" herokuDeploy.bat");
            getLog().info("HerokuDeployPlugin - success");
        } catch (IOException e) {
            getLog().info("HerokuDeployPlugin - error");
            getLog().error("Failed to run herokuDeploy.bat", e);
        }
    }
}