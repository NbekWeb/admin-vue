<script>
import { required, email, helpers } from "@vuelidate/validators";
import appConfig from "../../../app.config";
import axios from "axios";
import { signIn_API } from "../../service/login";
import {
	authMethods,
	authFackMethods,
	notificationMethods,
} from "@/state/helpers";

export default {
	page: {
		title: "Login",
		meta: [
			{
				name: "description",
				content: appConfig.description,
			},
		],
	},
	data() {
		return {
			login: "admin",
			password: "Admin123",
			submitted: false,
			authError: null,
			tryingToLogIn: false,
			isAuthError: false,
		};
	},
	validations: {
		login: {
			required: helpers.withMessage("Login is required", required),
			login: helpers.withMessage("Please enter valid login", email),
		},
		password: {
			required: helpers.withMessage("Password is required", required),
		},
	},
	computed: {},
	methods: {
		...authMethods,
		...authFackMethods,
		...notificationMethods,

		async signinapi() {
			const [error, response] = await signIn_API({
				login: this.login,
				password: this.password,
			});
			if (error) return;
			console.log("response", response);
			localStorage.setItem("token", response.data.access);
			if (response.data.status == "errors") {
				return (this.authError = response.data.data);
			}
			this.$router.push({
				path: "/",
			});
		},

		// Try to log the user in with the username
		// and password they provided.
		tryToLogIn() {
			this.submitted = true;
			// stop here if form is invalid
			this.$touch;

			if (this.$invalid) {
				return;
			} else {
				if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
					this.tryingToLogIn = true;
					// Reset the authError if it existed.
					this.authError = null;
					return (
						this.logIn({
							email: this.email,
							password: this.password,
						})
							// eslint-disable-next-line no-unused-vars
							.then((token) => {
								this.tryingToLogIn = false;
								this.isAuthError = false;
								// Redirect to the originally requested page, or to the home page
								this.$router.push({
									path: "/",
								});
							})
							.catch((error) => {
								this.tryingToLogIn = false;
								this.authError = error ? error : "";
								this.isAuthError = true;
							})
					);
				} else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
					const { email, password } = this;
					if (email && password) {
						this.login({
							email,
							password,
						});
					}
				} else if (process.env.VUE_APP_DEFAULT_AUTH === "authapi") {
					axios
						.post("http://127.0.0.1:8000/api/login", {
							email: this.email,
							password: this.password,
						})
						.then((res) => {
							return res;
						});
				}
			}
		},
	},
};
</script>

<template>
	<div class="auth-page-wrapper pt-5">
		<div class="auth-one-bg-position auth-one-bg" id="auth-particles">
			<div class="bg-overlay"></div>

			<div class="shape">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 1440 120"
				>
					<path
						d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
					></path>
				</svg>
			</div>
			<Particles
				id="tsparticles"
				:options="{
					particles: {
						number: {
							value: 90,
							density: {
								enable: true,
								value_area: 800,
							},
						},
						color: {
							value: '#ffffff',
						},
						shape: {
							type: 'circle',
							stroke: {
								width: 0,
								color: '#000000',
							},
							polygon: {
								nb_sides: 5,
							},
							image: {
								src: 'img/github.svg',
								width: 100,
								height: 100,
							},
						},
						opacity: {
							value: 0.8,
							random: true,
							anim: {
								enable: true,
								speed: 1,
								opacity_min: 0,
								sync: false,
							},
						},
						size: {
							value: 4,
							random: true,
							anim: {
								enable: false,
								speed: 4,
								size_min: 0.2,
								sync: false,
							},
						},
						line_linked: {
							enable: false,
							distance: 150,
							color: '#ffffff',
							opacity: 0.4,
							width: 1,
						},
						move: {
							enable: true,
							speed: 2,
							direction: 'none',
							random: false,
							straight: false,
							out_mode: 'out',
							attract: {
								enable: false,
								rotateX: 600,
								rotateY: 1200,
							},
						},
					},
					interactivity: {
						detect_on: 'canvas',
						events: {
							onhover: {
								enable: true,
								mode: 'bubble',
							},
							onclick: {
								enable: true,
								mode: 'repulse',
							},
							resize: true,
						},
						modes: {
							grab: {
								distance: 400,
								line_linked: {
									opacity: 1,
								},
							},
							bubble: {
								distance: 400,
								size: 4,
								duration: 2,
								opacity: 0.8,
								speed: 3,
							},
							repulse: {
								distance: 200,
							},
							push: {
								particles_nb: 4,
							},
							remove: {
								particles_nb: 2,
							},
						},
					},
					retina_detect: true,
					config_demo: {
						hide_card: false,
						background_color: '#b61924',
						background_image: '',
						background_position: '50% 50%',
						background_repeat: 'no-repeat',
						background_size: 'cover',
					},
				}"
			/>
		</div>

		<div class="auth-page-content">
			<b-container>
				<b-row>
					<b-col lg="12">
						<div class="text-center mt-sm-5 mb-4 text-white-50">
							<div>
								<router-link to="/" class="d-inline-block auth-logo">
								</router-link>
							</div>
							<p class="mt-3 fs-15 fw-medium">
								Паналь управление "Чистая вода"
							</p>
						</div>
					</b-col>
				</b-row>

				<b-row class="justify-content-center">
					<b-col md="8" lg="6" xl="5">
						<b-card no-body class="mt-4">
							<b-card-body class="p-4">
								<div class="text-center mt-2">
									<h5 class="text-primary">Добро пожаловать</h5>
									<p class="text-muted">Войдите, что бы продолжить.</p>
								</div>
								<div class="p-2 mt-4">
									<b-alert
										v-model="authError"
										variant="danger"
										class="mt-3"
										dismissible
										>{{ authError }}</b-alert
									>

									<div></div>

									<form @submit.prevent="tryToLogIn">
										<div class="mb-3">
											<label for="login" class="form-label"
												>Login</label
											>
											<input
												type="text"
												class="form-control"
												id="login"
												placeholder="Enter login"
												v-model="login"
											/>
											<div class="invalid-feedback">
												<span></span>
											</div>
										</div>

										<div class="mb-3">
											<div class="float-end">
												<router-link
													to="/forgot-password"
													class="text-muted"
													>Forgot password?</router-link
												>
											</div>
											<label class="form-label" for="password-input"
												>Password</label
											>
											<div
												class="position-relative auth-pass-inputgroup mb-3"
											>
												<input
													type="password"
													v-model="password"
													class="form-control pe-5"
													placeholder="Enter password"
													id="password-input"
												/>
												<b-button
													variant="link"
													class="position-absolute end-0 top-0 text-decoration-none text-muted"
													type="button"
													id="password-addon"
												>
													<i class="ri-eye-fill align-middle"></i>
												</b-button>
												<div class="invalid-feedback">
													<span></span>
												</div>
											</div>
										</div>

										<div class="form-check">
											<input
												class="form-check-input"
												type="checkbox"
												value=""
												id="auth-remember-check"
											/>
											<label
												class="form-check-label"
												for="auth-remember-check"
												>Remember me</label
											>
										</div>

										<div class="mt-4">
											<b-button
												variant="success"
												class="w-100"
												type="submit"
												@click="signinapi"
											>
												Sign In
											</b-button>
										</div>
									</form>
								</div>
							</b-card-body>
						</b-card>

						<div class="mt-4 text-center">
							<p class="mb-0">
								Don't have an account ?
								<router-link
									to="/register"
									class="fw-semibold text-primary text-decoration-underline"
								>
									Signup
								</router-link>
							</p>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</div>

		<footer class="footer">
			<b-container>
				<b-row>
					<b-col lg="12">
						<div class="text-center">
							<p class="mb-0 text-muted">
								&copy; {{ new Date().getFullYear() }} Чистая Вода.
								Crafted with
								<i class="mdi mdi-heart text-danger"></i> by Zesu
							</p>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</footer>
	</div>
</template>
