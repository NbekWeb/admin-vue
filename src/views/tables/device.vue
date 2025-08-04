<template>
	<Layout>
		<DeviceModal @create="fetchDevices" ref="_deviceRef" />
		<PageHeader :title="title" :items="items" />

		<el-card shadow="never">
			<div style="margin-bottom: 16px" class="card-header">
				<span class="card-title">Устройства</span>
				<el-button type="primary" :icon="Plus" @click="_deviceRef.open()">
					Добавить устройство
				</el-button>
			</div>

			<el-table
				:data="devices"
				border
				stripe
				style="width: 100%; margin-top: 16px"
				v-loading="loading"
				empty-text="Устройства не найдены"
			>
				<el-table-column prop="id" label="ID" width="80" />
				<el-table-column prop="factory_number" label="Заводской номер" />
				<el-table-column prop="name" label="Название устройства" />
				<el-table-column prop="func" label="функция" />
				<!-- <el-table-column prop="address" label="Адрес" />
				<el-table-column prop="mqttPath" label="Путь MQTT" />
				<el-table-column prop="offset" label="Сдвиг" /> -->

				<!-- <el-table-column label="Статус">
					<template #default="{ row }">
						<el-tag
							:type="row.status === 'active' ? 'success' : 'danger'"
						>
							{{ row.status === "active" ? "Активен" : "Неактивен" }}
						</el-tag>
					</template>
				</el-table-column> -->

				<el-table-column width="100">
					<template #default="{ row }">
						<el-button
							type="warning"
							:icon="Edit"
							@click="_deviceRef.open(row)"
						/>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import { Edit, Plus } from "@element-plus/icons-vue";
import DeviceModal from "./components/DeviceModal.vue";
import { getDevice_API } from "@/service/device";
// Fake API (almashtiring real xizmat bilan)
const devices = ref([]);

const title = "Таблицы";
const items = [
	{ text: "Tables", href: "/" },
	{ text: "Devices", active: true },
];

const loading = ref(false);
const _deviceRef = ref();

const fetchDevices = async () => {
	loading.value = true;
	const [error, res] = await getDevice_API();

	if (error) return;
	devices.value = res.results;

	loading.value = false;
};

onMounted(() => {
	fetchDevices();
});
</script>

<style scoped>
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 600;
	font-size: 18px;
	margin-bottom: 20px;
	padding-bottom: 20px;
}
</style>
