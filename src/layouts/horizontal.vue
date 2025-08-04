<script>
import NavBar from "@/components/nav-bar";
import RightBar from "@/components/right-bar";
import Footer from "@/components/footer";

export default {
  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path);
    },
    initActiveMenu(ele) {
      setTimeout(() => {
        if (document.querySelector("#navbar-nav")) {
          let a = document
            .querySelector("#navbar-nav")
            .querySelector('[href="' + ele + '"]');

          if (a) {
            a.classList.add("active");
            let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
            if (parentCollapseDiv) {
              parentCollapseDiv.classList.add("show");
              parentCollapseDiv.parentElement.children[0].classList.add(
                "active"
              );
              parentCollapseDiv.parentElement.children[0].setAttribute(
                "aria-expanded",
                "true"
              );
              if (
                parentCollapseDiv.parentElement.closest(
                  ".collapse.menu-dropdown"
                )
              ) {
                parentCollapseDiv.parentElement
                  .closest(".collapse")
                  .classList.add("show");
                if (
                  parentCollapseDiv.parentElement.closest(".collapse")
                    .previousElementSibling
                )
                  parentCollapseDiv.parentElement
                    .closest(".collapse")
                    .previousElementSibling.classList.add("active");
              }
            }
          }
        }
      }, 1000);
    },
  },
  components: {
    NavBar,
    RightBar,
    Footer
  },
};
</script>

<template>
  <div>
    <div id="layout-wrapper">
      <NavBar />
      <!-- ========== App Menu ========== -->
      <div class="app-menu navbar-menu">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <!-- Dark Logo-->
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              ЧВ
            </span>
            <span class="logo-lg">
              ЧВ
            </span>
          </router-link>
          <!-- Light Logo-->
          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              ЧВ
            </span>
            <span class="logo-lg">
              ЧВ
            </span>
          </router-link>
          <button type="button" class="
              btn btn-sm
              p-0
              fs-20
              header-item
              float-end
              btn-vertical-sm-hover
            " id="vertical-hover">
            <i class="ri-record-circle-line"></i>
          </button>
        </div>
        <div id="scrollbar">
          <b-container fluid>
            <ul class="navbar-nav h-100" id="navbar-nav">
              <li class="nav-item">
                <router-link to="/tables/basic" class="nav-link" data-key="t-basic-tables">Клиенты</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/tables/tarif" class="nav-link" data-key="t-basic-tables">Тарифы</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/tables/staff" class="nav-link" data-key="t-grid-js">Тарифы на устройства</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/tables/device" class="nav-link" data-key="t-grid-js">Устройства</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/tables/payment" class="nav-link" data-key="t-grid-js">Оплата</router-link>
              </li>
            </ul>
          </b-container>
          <!-- Sidebar -->
        </div>
        <!-- Left Sidebar End -->
        <!-- Vertical Overlay-->
        <div class="vertical-overlay"></div>
      </div>
      <!-- ============================================================== -->
      <!-- Start Page Content here -->
      <!-- ============================================================== -->

      <div class="main-content">
        <div class="page-content">
          <!-- Start Content-->
          <b-container fluid>
            <slot />
          </b-container>
        </div>
        <Footer />
      </div>
      <RightBar />
    </div>
  </div>
</template>