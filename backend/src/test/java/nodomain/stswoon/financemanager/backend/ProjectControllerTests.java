package nodomain.stswoon.financemanager.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import nodomain.stswoon.financemanager.backend.projects.ProjectDto;
import nodomain.stswoon.financemanager.backend.projects.ProjectEntity;
import nodomain.stswoon.financemanager.backend.projects.ProjectRepository;
import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ProjectControllerTests {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ProjectRepository projectRepository;

	@Test
	public void createOperation() throws Exception {
		ProjectDto projectDto = new ProjectDto(null, "test");
		String requestBody = saveRequestJsonString(projectDto);

		MockHttpServletRequestBuilder request = MockMvcRequestBuilders
				.put("/project/1")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(requestBody);

		ResultActions resultActions = mockMvc.perform(request);

		resultActions
				.andExpect((status().isOk()))
				.andExpect(jsonPath("$.name", Matchers.is(projectDto.getName())))
				.andExpect(jsonPath("$.id", Matchers.notNullValue()));

		ProjectEntity projectEntity = projectRepository.findByName(projectDto.getName()).get(0);
		Assert.assertNotNull(projectEntity);
	}

	private final static ObjectMapper OBJECT_MAPPER = new ObjectMapper();

	private String saveRequestJsonString(Object object) throws JsonProcessingException {
		return OBJECT_MAPPER.writeValueAsString(object);
	}

}
