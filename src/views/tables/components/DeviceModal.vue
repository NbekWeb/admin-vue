<template>
	<el-dialog
		v-model="visible"
		:title="form.id ? 'Создать Устройства' : 'edit Устройства'"
		width="500px"
		:before-close="onCancel"
	>
		<el-form label-position="top" :model="form" :rules="rules" ref="formRef">
			<el-form-item label="Название" prop="name">
				<el-input placeholder="Введите Название" v-model="form.name" />
			</el-form-item>

			<el-form-item label="Заводской номер" prop="factory_number">
				<el-input
					v-model="form.factory_number"
					placeholder="Введите Заводской номер"
					type="text"
					clearable
					@input="onPriceInput"
				/>
			</el-form-item>

			<el-form-item label="функция" prop="func">
				<el-select
					v-model="form.func"
					placeholder="Выберите функция"
				>
					<el-option label="SET" value="SET" />
					<el-option label="GET" value="GET" />
				</el-select>
			</el-form-item>
		</el-form>

		<template #footer>
			<el-button @click="onCancel">Отмена</el-button>
			<el-button type="primary" @click="onSubmit">Сохранить</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from "vue";
import { ElMessage } from "element-plus";
const emit = defineEmits(["update:modelValue", "create"]);
import { addDevice_API, editDevice_API } from "@/service/device";
// Visibility binding
const visible = ref(false);
const onPriceInput = (value) => {
	form.value.factory_number = value.replace(/[^\d.,]/g, "");
};
// Form state & validation
const formRef = ref(null);
const form = ref({
	name: "",
	factory_number: null,
	func: "",
});
const rules = {
	name: [{ required: true, message: "Введите название", trigger: "submit" }],
	factory_number: [
		{ required: true, message: "Введите Заводской номер", trigger: "submit" },
	],
};

// Handlers
const onSubmit = () => {
	formRef.value.validate(async (valid) => {
		if (valid) {
			const [error] = form.value.id
				? await editDevice_API(form.value)
				: await addDevice_API(form.value);

			if (error) {
				ElMessage.error("Ошибка");
				visible.value = false;
				return;
			}
			emit("create");
			visible.value = false;
			ElMessage.success(form.value.id ? "Устройства создан" : "Устройства изменился");
		}
	});
};
function open(data = null) {
	visible.value = true;
	if (data) {
		form.value = {...data};
	}
}
const onCancel = () => {
	visible.value = false;
};
defineExpose({
	open,
});
</script>

<style scoped>
.card-header {
	/* Берем стиль из родителя, если нужно */
}
</style>
